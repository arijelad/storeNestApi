import { ProductKeyword } from "../product-keywords.enum";
import { IsEnum } from "class-validator";

export class UpdateProductKeywordDto{

  @IsEnum(ProductKeyword)
  keyword: ProductKeyword
}