import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CoffeeVariety } from './coffeeVariety.entity';

@Entity({ name: 'coffee', schema: 'public' })
@Unique(['name'])
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  varietyId: number;

  @ManyToOne(() => CoffeeVariety, (coffeVariety) => coffeVariety.coffee)
  @JoinColumn({ name: 'varietyId' })
  variety: CoffeeVariety;
}
