// src/modules/testing/dto/create-testing.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { CoffeeVariety } from '../entities/coffee.entity';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name must not exceed 30 characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Description must not exceed 50 characters' })
  description: string;

  @IsEnum(CoffeeVariety, {
    message: 'Coffee variety must be <Arabic> or <Robusta>',
  })
  variety: CoffeeVariety;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be a positive number or zero' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid URL format' })
  @MaxLength(2048, { message: 'Image URL must not exceed 2048 characters' })
  imageUrl: string;
}
