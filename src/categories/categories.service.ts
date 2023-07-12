import { Injectable } from '@nestjs/common';
import { Category } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';

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
}
