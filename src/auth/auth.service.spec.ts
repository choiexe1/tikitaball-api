import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { mock } from 'jest-mock-extended';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  const userServiceMock = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
  });

  it('정의되어 있어야한다.', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('signUp', () => {
    it('회원가입에 성공하면 회원 정보를 반환해야한다.', async () => {
      // Arrange
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'test1234',
      };

      userService.create = jest.fn().mockResolvedValue(user);

      // Act
      const result = await service.signUp({
        email: 'test@test.com',
        password: 'test1234',
      });

      // Assert
      expect(result).toEqual(user);
    });
  });
});
