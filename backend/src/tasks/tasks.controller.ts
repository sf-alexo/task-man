import { Body, Controller, Post, Get, Put, Delete, Param, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { UpdateTaskDto } from './dtos/UpdateTask.dto';
import { Task } from 'src/typeorm';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query('taskId', new ParseIntPipe({ optional: true })) taskId?: number) {
    if (taskId) {
      return this.tasksService.getTasksByTaskId(taskId);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get('id/:id')
  async findTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findTaskById(id);
  }

  //curl -X POST http://localhost:3000/tasks/create -H "Content-Type: application/json" -d '{ "name": "New Task", "dateStart": "2022-12-31", "dateEnd": "2023-01-01", "taskId": 1 }'
  @Post('create')
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  //curl -X PUT http://localhost:3000/tasks/1 -H "Content: application/json" -d '{ "name": "Updated Task", "dateStart": "2023-01-02", "dateEnd": "2023-01-03", "taskId": 2 }'
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  //curDELETE http://localhost:3000/tasks/2
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
