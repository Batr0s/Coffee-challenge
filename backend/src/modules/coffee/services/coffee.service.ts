import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { CreateCoffeeDto } from '../dto/coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async getCoffee(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async createCoffee(coffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffeNameExists = await this.coffeeRepository.findOne({
      where: { name: coffeeDto.name },
    });

    if (coffeNameExists) {
      throw new HttpException(
        'A coffee with the same name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const coffee = this.coffeeRepository.create(coffeeDto);
    return this.coffeeRepository.save(coffee);
  }
}
