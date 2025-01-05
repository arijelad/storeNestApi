import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./product-keywords.enum";
import { IsEnum } from "class-validator";

@Entity()
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  name:string;

  @Column()
  price:number;

  @Column({ default: ProductCategory.ALL })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @Column({ default: ProductKeyword.ALL })
  @IsEnum(ProductKeyword)
  keyword: ProductKeyword;
}
