import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProyectsModule } from './proyects/proyects.module';
import { BullModule } from '@nestjs/bull';

console.log(process.env.NODE_ENV==='TEST', process.env.NODE_ENV)
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username:'postgres',
      entities: [__dirname+'/**/*.entity{.ts,.js}'],
      database: process.env.NODE_ENV === 'TEST'? 'test_nest3' :'nest3',
      synchronize:true,

    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EmployeesModule,
    ProyectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
