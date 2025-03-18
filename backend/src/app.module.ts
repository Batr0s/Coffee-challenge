import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './modules/coffee/coffee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    CoffeeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
