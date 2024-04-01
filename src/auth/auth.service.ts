import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(dto: Prisma.UserCreateInput) {
    return await this.userService.create(dto);
  }
}
