import { Body, Controller, Post, Get, Put, Delete, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { UpdateCategoryDto } from './dtos/UpdateCategory.dto';
import { Category } from 'src/typeorm';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //curl http://localhost:3000/categories
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  //curl -X POST http://localhost:3000/categories/create -H "Content-Type: application/json" -d '{ "name": "New Category", "userId": 1 }'
  @Post('create')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  // curl -X PUT http://localhost:3000/categories/4 -H "Content-Type: application/json" -d '{"name": "Updated Again Category Naeeee", "userId": 3 }'
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateCategory(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  // curl -X DELETE http://localhost:3000/categories/1
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }

}
