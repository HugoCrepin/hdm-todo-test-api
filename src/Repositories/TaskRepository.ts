import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      return this.prisma.task.create({
        data: {
          name: data.name as string,
        },
      });
    }
  
    if (typeof data.name === 'string') {
      return this.prisma.task.update({
        where: {
          id: data.id as number,
        },
        data: {
          name: data.name as string,
        },
      });
    }
  
    throw new Error("Le nom de la tâche doit être une chaîne de caractères");
  }
  
}
