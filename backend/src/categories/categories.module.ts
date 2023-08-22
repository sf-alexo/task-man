import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver'; // Import the CategoriesResolver
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesResolver, CategoriesService], // Include CategoriesResolver here
})
export class CategoriesModule {}
