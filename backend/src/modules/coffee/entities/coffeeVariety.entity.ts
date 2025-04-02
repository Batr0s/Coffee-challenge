import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
@Unique(['name'])
export class CoffeeVariety {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Coffee, (coffee) => coffee.variety)
  coffee: Coffee;
}
