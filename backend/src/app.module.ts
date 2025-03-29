import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './modules/coffee/coffee.module';
import { typeOrmConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CoffeeModule],
  controllers: [],
})
export class AppModule {}
