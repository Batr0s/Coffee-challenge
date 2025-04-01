import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CoffeeVariety } from '../entities/coffee.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({
    description: 'The name of the coffee',
    example: 'Espresso',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name must not exceed 30 characters' })
  name: string;

  @ApiProperty({
    description: 'The description of the coffee',
    example: 'Rich and bold espresso blend.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Description must not exceed 50 characters' })
  description: string;

  @ApiProperty({
    description: 'The variety of the coffee (must be Arabic or Robusta)',
    example: 'Robusta',
    default: 'Robusta',
  })
  @IsEnum(CoffeeVariety, {
    message: 'Coffee variety must be <Arabic> or <Robusta>',
  })
  variety: CoffeeVariety;

  @ApiProperty({
    description: 'The price of the coffee',
    example: 5.75,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be a positive number or zero' })
  price: number;

  @ApiProperty({
    required: false,
    description: 'The URL of the coffee image',
    example:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
    default:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  })
  @IsString()
  @IsUrl({}, { message: 'Invalid URL format' })
  @MaxLength(2048, { message: 'Image URL must not exceed 2048 characters' })
  @IsOptional()
  imageUrl: string;
}
