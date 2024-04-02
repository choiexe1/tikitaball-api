import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/user/bcrypt.service';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let authService: AuthService;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        BcryptService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('회원가입에 성공하면 패스워드를 제외한 회원 정보를 반환해야한다.', async () => {
      // Arrange
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        password: 'test1234',
      };

      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'test1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(user);

      // Act
      const result = await controller.signUp(signUpDto);

      // Assert
      expect(result).toEqual(user);
      expect(authService.signUp).toHaveBeenCalled();
    });
  });
});
