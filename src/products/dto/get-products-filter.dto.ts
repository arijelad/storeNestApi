import { IsEnum, IsOptional, IsString, Min, IsNumber } from 'class-validator';
import { ProductKeyword } from "../product-keywords.enum";
import { ProductCategory } from "../product-categories.enum";


export class GetProductsFilterDto {
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductKeyword)
  keyword?: ProductKeyword;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
