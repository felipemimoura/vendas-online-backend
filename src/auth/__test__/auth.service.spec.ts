import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../..//user/__mocks__/user.mock';
import { ReturnUserDto } from '../..//user/dtos/returnUser.dto';
import { UserService } from '../../user/user.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { AuthService } from '../auth.service';
import { loginUserMock } from './../__mocks__/login-user.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });
  it('should return user if password and email valid defined', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return  error if password and email valid defined', async () => {
    expect(
      service.login({ ...loginUserMock, password: 'asdb' }),
    ).rejects.toThrowError();
  });

  it('should return user if email not exist ', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);

    expect(
      service.login({ ...loginUserMock, password: 'asdb' }),
    ).rejects.toThrowError();
  });

  it('should return error in UserService ', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
