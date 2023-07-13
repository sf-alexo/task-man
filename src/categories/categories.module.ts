import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TasksModule } from '../tasks/tasks.module';


@Module({
  imports: [TasksModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
