import {Module} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database:'postgres',
      autoLoadEntities:true, //defining entities, that is how they translate in databes with typeorm,FIND/LOAD
      synchronize:true, //ALWAYS KEEP DATABASE IN SYNC(CAN DO MANUAL MIGRATION)
    }),
    AuthModule
  ],

})
export class AppModule {}