import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeService } from '../services/coffee.service';
import { CreateCoffeeDto } from '../dto/coffee.dto';

@Controller('/coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  async getCoffee() {
    return this.coffeeService.getCoffee();
  }

  @Post()
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(createCoffeeDto);
  }
}
