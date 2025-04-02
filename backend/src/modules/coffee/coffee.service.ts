import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/createCoffee.dto';
import { Coffee } from './entities/coffee.entity';
import { CoffeeVariety } from './entities/coffeeVariety.entity';
import { UpdateCoffeeDto } from './dto/updateCoffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(CoffeeVariety)
    private readonly coffeeVarietyRepository: Repository<CoffeeVariety>,
  ) {}

  async getCoffees(): Promise<Coffee[]> {
    return this.coffeeRepository.find({
      relations: ['variety'],
      order: { id: 'ASC' },
    });
  }

  async getOneCoffee(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['variety'],
    });
    if (coffee) return coffee;
    throw new HttpException(
      `The coffee with id '${id}' does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async createCoffee(coffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const CoffeeExists = await this.coffeeRepository.findOne({
      where: { name: coffeeDto.name },
    });
    if (CoffeeExists) {
      throw new HttpException(
        `A coffee with name '${coffeeDto.name}' already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const varietyExists = await this.coffeeVarietyRepository.findOne({
      where: { id: coffeeDto.varietyId },
    });
    if (!varietyExists) {
      throw new HttpException(
        `Variety id '${coffeeDto.varietyId}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const coffee = this.coffeeRepository.create(coffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async updateCoffee(updateCoffee: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.update(
      { id: updateCoffee.id },
      updateCoffee,
    );
    if (coffee.affected === 0) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async deleteCoffee(id: number) {
    const coffee = await this.coffeeRepository.delete({ id });
    if (coffee.affected === 0) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
}
