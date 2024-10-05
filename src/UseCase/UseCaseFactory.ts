import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import TaskRepository from 'src/Repositories/TaskRepository';

type UseCases = GetAllTasksUseCase | DeleteTask;

@Injectable()
export default class UseCaseFactory {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create<T>(useCase: new (...args: any[]) => T): Promise<T> {
    return new useCase(this.taskRepository);
  }
}


