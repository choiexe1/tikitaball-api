import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BcryptService } from './bcrypt.service';
import { UnprocessableEntityException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        BcryptService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('정의되어 있어야한다.', () => {
    expect(service).toBeDefined();
    expect(bcryptService).toBeDefined();
  });

  describe('create', () => {
    it('유저 생성에 성공하면 유저 정보를 반환해야한다.', async () => {
      // Arrange
      const newUser = {
        email: 'test@test.com',
        password: 'test1234',
      };

      const hashedPassword = bcryptService.hash(newUser.password);

      const now = new Date();

      prismaMock.user.create.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      });

      // Act
      const result = await service.create(newUser);

      // Assert
      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      });
    });

    it('이미 사용중인 이메일일 경우 에러를 반환해야한다.', async () => {
      // Arrange
      const newUser = {
        email: 'test@test.com',
        password: 'test1234',
      };

      service.findOne = jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@test.com',
      });

      // Act
      // Assert
      await expect(async () => await service.create(newUser)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
