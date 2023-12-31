import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/typeorm';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksResolver],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
