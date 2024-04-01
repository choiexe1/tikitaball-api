import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('UserService', () => {
  let service: UserService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('정의되어 있어야한다.', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('유저 생성에 성공하면 유저 정보를 반환해야한다.', async () => {
      // Arrange
      const newUser = {
        email: 'test@test.com',
        password: 'test1234',
      };

      prismaMock.user.create.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: 'test1234',
      });

      // Act
      const result = await service.create(newUser);

      // Assert
      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        password: 'test1234',
      });
    });
  });
});
