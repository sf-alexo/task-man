import {
Body,
Controller,
Get,
Param,
ParseIntPipe,
Post,
UsePipes,
ValidationPipe,
} from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }
  
  
}