import { ProductCategory } from "../product-categories.enum";
import { ProductKeyword } from "../products-keywords.enum";
export declare class GetProductsFilterDto {
    keyword?: ProductKeyword;
    category?: ProductCategory;
    search?: string;
    min?: number;
    max?: number;
}
