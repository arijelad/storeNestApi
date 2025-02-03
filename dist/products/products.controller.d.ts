import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";
import { UpdateProductKeywordDto } from "./dto/update-product-keyword.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getProducts(filterDto: GetProductsFilterDto): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    updateProductCategory(id: string, updateProductCategoryDto: UpdateProductCategoryDto): Promise<Product>;
    updateProductKeyword(id: string, updateProductKeywordDto: UpdateProductKeywordDto): Promise<Product>;
}
