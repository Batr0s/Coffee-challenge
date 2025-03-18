import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CoffeeVariety {
  ARABICA = 'Arabic',
  ROBUSTA = 'Robusta',
}

@Entity({ name: 'coffee', schema: 'public' })
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({
    type: 'enum',
    enum: CoffeeVariety,
  })
  variety: CoffeeVariety;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;
}
