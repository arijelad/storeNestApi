import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-categories.enum";
import { ProductKeyword } from "./products-keywords.enum";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: ProductCategory;

  @Column()
  keyword:ProductKeyword;
}