import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dtos/create-category.input';
import { UpdateCategoryInput } from './dtos/update-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  getCategories() {
    return this.categoriesService.getCategories();
  }

@Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryInput);
  }

  @Mutation(() => Boolean) 
async deleteCategory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
  await this.categoriesService.deleteCategory(id);
  return true; // Indicate successful deletion
}

@Mutation(() => Category)
  async updateCategory(
    @Args('id', { type: () => Float }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, updateCategoryInput);
  }
}
