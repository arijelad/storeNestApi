import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "../product-categories.enum";
import { ProductKeyword } from "../products-keywords.enum";

export class GetProductsFilterDto{

  @IsOptional()
  @IsEnum(ProductKeyword)
  keyword?: ProductKeyword;

  @IsOptional()
  @IsEnum(ProductKeyword)
  category?: ProductCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  min?: number;

  @IsOptional()
  @IsNumber()
  max?:number;
}