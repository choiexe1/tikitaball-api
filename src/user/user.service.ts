import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
    });
  }
}
