import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/typeorm';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { UpdateTaskDto } from './dtos/UpdateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTasksByTaskId(taskId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { taskId } });
  }

  async findTaskById(id: number) {
    return this.taskRepository.findOneBy({ id: id });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, dateStart, dateEnd, taskId } = createTaskDto;

    const newTask = this.taskRepository.create({
      name,
      dateStart,
      dateEnd,
      taskId,
    });

    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.name) {
      task.name = updateTaskDto.name;
    }

    if (updateTaskDto.dateStart) {
      task.dateStart = updateTaskDto.dateStart;
    }

    if (updateTaskDto.dateEnd) {
      task.dateEnd = updateTaskDto.dateEnd;
    }

    if (updateTaskDto.taskId) {
      task.taskId = updateTaskDto.taskId;
    }

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);
  }
}
