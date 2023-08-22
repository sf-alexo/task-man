import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Category } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { UpdateCategoryDto } from './dtos/UpdateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, userId } = createCategoryDto;

    const newCategory = this.categoryRepository.create({
      name,
      dateCreated: new Date(),
      userId: userId  // Assign the userId to the user property
    });

    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.userId) {
      category.userId = updateCategoryDto.userId;
    }

    if (!updateCategoryDto.dateCreated) {
      category.dateCreated = new Date();
    } else {
      category.dateCreated = updateCategoryDto.dateCreated;
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);
  }
}
