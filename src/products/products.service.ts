import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./product-keywords.enum";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository : Repository<Product>
  ){
  }
  async getProducts(filterDto:GetProductsFilterDto) :Promise<Product[]>{
    const {category, keyword, minPrice, maxPrice, search} = filterDto;
    const query = this.productsRepository.createQueryBuilder('product');

    if(category){
      query.andWhere('product.category = :category', {category});
    }

    if(keyword){
      query.andWhere('product.keyword = :keyword', {keyword});
    }
    if(minPrice !== undefined){
      query.andWhere('product.price >= minPrice', {minPrice})
    }
    if(maxPrice!== undefined){
      query.andWhere('product.price <= maxPrice', {maxPrice})
    }

    if(search){
      query.andWhere(
        'LOWER(product.name) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const products = query.getMany();
    return products;

  }

  async getProductById(id: string): Promise<Product>{
    const product = await this.productsRepository.findOne({
      where: {id}
    });
    if(!product) {
      throw new NotFoundException(`Task with this ${id} does not exist`);
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product>{
    const {name,price} = createProductDto;
    //sad cemo kreirati task i vratiti task
    const product = this.productsRepository.create({
      name,
      price,
      category: ProductCategory.ALL,
      keyword :ProductKeyword.ALL
    });
    await this.productsRepository.save(product); // ovo govori da je asinhrona funkcija
    return product;
  }

  async updateProductCategory(id:string, categories:ProductCategory): Promise<Product>{
    const product = await this.getProductById(id);
    product.category = categories;
    await this.productsRepository.save(product);//saving new product
    return product;
  }
  async updateProductKeyword(id:string, keyword:ProductKeyword): Promise<Product>{
    const product = await this.getProductById(id);
    product.keyword = keyword;
    await this.productsRepository.save(product);//saving new updated product
    return product;
  }
  async deleteProduct(id:string):Promise<void>{
    const deleted = await this.productsRepository.delete(id);
    //console.log(deleted);
    if(deleted.affected ===0){
      throw new NotFoundException(`Task with this ${id} does not exist, and cannot be found`)
    }

  }
}
