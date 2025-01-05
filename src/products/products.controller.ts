import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { ProductsService } from "./products.service";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";
import { UpdateProductKeywordDto } from "./dto/update-product-keyword.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ){}

  @Get()
  getProducts(@Query() filterDto: GetProductsFilterDto):Promise<Product[]>{
    return this.productsService.getProducts(filterDto)
  }
  @Get('/:id')
  getProductById(@Param('id')id:string){
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) : Promise<Product>{
  return this.productsService.createProduct(createProductDto);
  }

  @Patch('/:id/category')
  updateProductCategory(
    @Param('id') id: string,
    @Body() updateProductCategoryDto :UpdateProductCategoryDto,
  ) : Promise<Product>{
    const {category} = updateProductCategoryDto;
    return this.productsService.updateProductCategory(id,category);
  }
  @Patch('/:id/keyword')
  updateProductKeyword(
    @Param('id') id:string,
    @Body() updateProductKeywordDto: UpdateProductKeywordDto,
  ):Promise<Product>{
    const {keyword}=updateProductKeywordDto;
    return this.productsService.updateProductKeyword(id, keyword);

  }

  @Delete('/:id')
  deleteProduct(
    @Param('id')id: string,
  ):Promise<void>{
    return this.productsService.deleteProduct(id);
  }

}
/*
* @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }*/
