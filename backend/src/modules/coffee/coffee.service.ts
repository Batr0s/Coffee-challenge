import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/createCoffee.dto';
import { UpdateCoffeeDto } from './dto/updateCoffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async getCoffees(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async getOneCoffee(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (coffee) return coffee;
    throw new HttpException(
      `The coffee with id '${id}' does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async createCoffee(coffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const exists = await this.coffeeRepository.findOne({
      where: { name: coffeeDto.name },
    });
    if (exists) {
      throw new HttpException(
        `A coffee with name '${coffeeDto.name}' already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const coffee = this.coffeeRepository.create(coffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async updateCoffee(updateCoffee: UpdateCoffeeDto) {
    const result = await this.coffeeRepository.update(
      { id: updateCoffee.id },
      updateCoffee,
    );
    console.log(result);
    return result;
  }

  async deleteCoffee(id: number) {
    const result = await this.coffeeRepository.delete({ id });
    console.log(result);
    return result;
  }
}
