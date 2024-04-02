import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(dto: Prisma.UserCreateInput) {
    const user = await this.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new UnprocessableEntityException('이미 사용중인 이메일입니다.');
    }

    const hashedPassword = this.bcryptService.hash(dto.password);

    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async findOne(arg: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(arg);
  }
}
