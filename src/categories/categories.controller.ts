import { Body, Controller, Post, Get, Put, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { UpdateCategoryDto } from './dtos/UpdateCategory.dto';
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

  @Put(':id')
@UsePipes(ValidationPipe)
async updateCategory(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateCategoryDto: UpdateCategoryDto,
): Promise<Category> {
  return this.categoriesService.updateCategory(id, updateCategoryDto);
}

}
