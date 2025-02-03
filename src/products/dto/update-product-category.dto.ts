import {IsEnum} from 'class-validator';
import { ProductCategory } from "../product-categories.enum";

export class UpdateProductCategoryDto{
  @IsEnum(ProductCategory)
  category: ProductCategory;
}