import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/coffee.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all coffees' })
  @ApiResponse({
    status: 200,
    description: 'Returned all coffees',
  })
  async getCoffee() {
    return this.coffeeService.getCoffee();
  }

  @Post()
  @ApiOperation({ summary: 'Create coffee' })
  @ApiResponse({
    status: 201,
    description: 'Coffee successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Error creating coffee',
  })
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(createCoffeeDto);
  }
}
