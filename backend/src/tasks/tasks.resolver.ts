import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Task } from 'src/typeorm';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dtos/create-task.input';
import { UpdateTaskInput } from './dtos/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  findAllTasks() {
    return this.tasksService.getTasks();
  }

  @Query(() => Task, { name: 'task' })
  findTaskById(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findTaskById(id);
  }


 @Mutation(() => Task) // Specify the return type here
  async createTask(@Args('createTaskInput') input: CreateTaskInput): Promise<Task> {
    return this.tasksService.createTask(input);
  }


  @Mutation(() => Task) // Specify the return type here
  updateTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.tasksService.updateTask(id, updateTaskInput);
  }

  @Mutation(() => Task) // Specify the return type here
  deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
