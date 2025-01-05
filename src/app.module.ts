import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [ProductsModule,
  TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgresql',
    database:'react-store',
    autoLoadEntities:true,
    synchronize:true,
   })
  ],
})
export class AppModule {}
/*
* @Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database:'task-management',
      autoLoadEntities:true, //defining entities, that is how they translate in databes with typeorm,FIND/LOAD
      synchronize:true, //ALWAYS KEEP DATABASE IN SYNC(CAN DO MANUAL MIGRATION)
    })
  ],

})
export class AppModule {}
*/
