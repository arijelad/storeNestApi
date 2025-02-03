import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./products-keywords.enum";
export declare class Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: ProductCategory;
    keyword: ProductKeyword;
}
