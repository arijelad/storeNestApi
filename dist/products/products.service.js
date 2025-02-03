"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const products_entity_1 = require("./products.entity");
const typeorm_2 = require("@nestjs/typeorm");
const product_categories_enum_1 = require("./product-categories.enum");
const products_keywords_enum_1 = require("./products-keywords.enum");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    getProducts(filterDto) {
        const { search, min, max, category, keyword } = filterDto;
        const query = this.productsRepository.createQueryBuilder('product');
        if (search) {
            query.andWhere('LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }
        if (min !== undefined) {
            query.andWhere('product.price >= :min', { min });
        }
        if (max !== undefined) {
            query.andWhere('product.price <= :max', { max });
        }
        if (category) {
            query.andWhere('product.category = :category', { category });
        }
        if (keyword) {
            query.andWhere('product.keyword = :keyword', { keyword });
        }
        const products = query.getMany();
        return products;
    }
    async getProductById(id) {
        const found = await this.productsRepository.findOne({
            where: { id }
        });
        if (!found) {
            throw new common_1.NotFoundException(`Task with ID "${id}" does not exist`);
        }
        return found;
    }
    async createProduct(createProductDto) {
        const { title, description, price } = createProductDto;
        const product = this.productsRepository.create({
            title,
            description,
            price,
            category: product_categories_enum_1.ProductCategory.ALL,
            keyword: products_keywords_enum_1.ProductKeyword.ALL
        });
        await this.productsRepository.save(product);
        return product;
    }
    async deleteProduct(id) {
        const deleted = await this.productsRepository.delete(id);
        if (deleted.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" does not exist`);
        }
    }
    async updateProductCategory(id, category) {
        const product = await this.getProductById(id);
        product.category = category;
        await this.productsRepository.save(product);
        return product;
    }
    async updateProductKeyword(id, keyword) {
        const product = await this.getProductById(id);
        product.keyword = keyword;
        await this.productsRepository.save(product);
        return product;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map