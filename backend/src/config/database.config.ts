import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'mvst-coffee-challenge-db',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  schema: 'public',
  extra: {
    timezone: 'Europe/Madrid',
  },
};
