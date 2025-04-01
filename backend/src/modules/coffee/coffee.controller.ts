import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/createCoffee.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/updateCoffee.dto';

@Controller('/coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all coffee entries' })
  @ApiResponse({
    status: 200,
    description: 'A list of all coffees',
  })
  async getCoffees(): Promise<Coffee[]> {
    return this.coffeeService.getCoffees();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single coffee by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The requested coffee',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Coffee not found',
  })
  async getOneCoffee(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeeService.getOneCoffee(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new coffee entry' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The coffee has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(createCoffeeDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing coffee' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The coffee has been successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async updateCoffee(@Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.updateCoffee(updateCoffeeDto);
  }

  @Delete(':id')
  async deleteCoffee(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.deleteCoffee(id);
  }
}
