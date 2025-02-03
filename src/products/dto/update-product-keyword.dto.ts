import {IsEnum} from 'class-validator';
import { ProductKeyword } from "../products-keywords.enum";

export class UpdateProductKeywordDto{
  @IsEnum(ProductKeyword)
  keyword: ProductKeyword;
}