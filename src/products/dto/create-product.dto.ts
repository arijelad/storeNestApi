import { ProductCategory } from "../product-categories.enum";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductKeyword } from "../product-keywords.enum";
import { Transform } from "class-transformer";

export class CreateProductDto{

  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => parseFloat(value))
  price:number;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductKeyword)
  keyword:string;
}