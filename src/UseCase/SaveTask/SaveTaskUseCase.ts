// src/UseCase/SaveTask/SaveTaskUseCase.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    // Validation simple
    if (!dto.name) {
      throw new BadRequestException('Le nom de la tâche ne peut pas être vide.');
    }

    try {
      const taskData = {
        name: dto.name,
      };

      if (dto.id) {
        // Mettre à jour la tâche si l'ID existe
        return this.taskRepository.save({ ...taskData, id: dto.id });
      } else {
        // Créer une nouvelle tâche
        return this.taskRepository.save(taskData);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
