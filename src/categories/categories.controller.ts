import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { Category } from 'src/typeorm';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
