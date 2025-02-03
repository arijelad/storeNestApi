import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./products-keywords.enum";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    getProducts(filterDto: GetProductsFilterDto): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    updateProductCategory(id: string, category: ProductCategory): Promise<Product>;
    updateProductKeyword(id: string, keyword: ProductKeyword): Promise<Product>;
}
