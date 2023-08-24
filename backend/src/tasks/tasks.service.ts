import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/typeorm';
import { CreateTaskInput } from './dtos/create-task.input';
import { UpdateTaskInput } from './dtos/update-task.input';

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

  async findTaskById(id: number): Promise<Task | undefined> {
    return this.taskRepository.findOneBy({ id: id });
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const { name, dateStart, dateEnd, taskId } = createTaskInput;

    const newTask = this.taskRepository.create({
      name,
      dateStart,
      dateEnd,
      taskId,
    });

    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskInput.name !== undefined) {
      task.name = updateTaskInput.name;
    }

    if (updateTaskInput.dateStart !== undefined) {
      task.dateStart = updateTaskInput.dateStart;
    }

    if (updateTaskInput.dateEnd !== undefined) {
      task.dateEnd = updateTaskInput.dateEnd;
    }

    if (updateTaskInput.taskId !== undefined) {
      task.taskId = updateTaskInput.taskId;
    }

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);
    return task;
  }

  async deleteTasksByCategoryId(categoryId: number): Promise<void> {
    const tasks = await this.taskRepository.find({ where: { taskId: categoryId } });
    await this.taskRepository.remove(tasks);
  }
}
