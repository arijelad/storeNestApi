import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./products-keywords.enum";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {
  }

  getProducts(filterDto: GetProductsFilterDto):Promise<Product[]>{
    const{search,min,max,category,keyword} = filterDto;
    const query = this.productsRepository.createQueryBuilder('product');

    if(search){
      query.andWhere(
        'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
        {search:`%${search}%`},
      );
    }
    if(min !== undefined){
      query.andWhere('product.price >= :min', {min})
    }
    if(max !== undefined){
      query.andWhere('product.price <= :max', {max})
    }
    if(category){
      query.andWhere('product.category = :category', {category})
    }
    if(keyword){
      query.andWhere('product.keyword = :keyword', {keyword})
    }
    const products = query.getMany();
    return products;


  }

  async getProductById(id:string): Promise<Product>{
    const found = await this.productsRepository.findOne({
      where: {id}
    });
    if(!found){
      throw new NotFoundException(`Task with ID "${id}" does not exist`);
    }
    return found;
  }

  async createProduct(createProductDto: CreateProductDto):Promise<Product>{
    const {title,description, price} = createProductDto;

    const product = this.productsRepository.create({
      title,
      description,
      price,
      category:ProductCategory.ALL,
      keyword: ProductKeyword.ALL
    });
    await this.productsRepository.save(product);
    return product;
  }
  async deleteProduct(id: string):Promise<void>{
    const deleted = await this.productsRepository.delete(id);
    if(deleted.affected ===0){
      throw new NotFoundException(`Task with ID "${id}" does not exist`)
    }
  }

  async updateProductCategory(id: string, category: ProductCategory): Promise<Product>{
    const product = await this.getProductById(id);
    product.category = category;
    await this.productsRepository.save(product);
    return product;
  }

  async updateProductKeyword(id: string, keyword: ProductKeyword): Promise<Product>{
    const product = await this.getProductById(id);
    product.keyword = keyword;
    await this.productsRepository.save(product);
    return product;
  }

}
