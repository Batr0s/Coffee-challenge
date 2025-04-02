import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Coffee } from './entities/coffee.entity';
import { CoffeeVariety } from './entities/coffeeVariety.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, CoffeeVariety])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
  /*
  For using the CoffeeService outside this module:
  exports: [CoffeeService],
  */
})
export class CoffeeModule {}
