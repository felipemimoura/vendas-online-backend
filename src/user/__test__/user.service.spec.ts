import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserMock } from '../__mocks__/createUser.mock';
import { userEntityMock } from '../__mocks__/user.mock';
import { UserEntity } from '../entites/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  // Repository mock
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should find user by email', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined); // Replace

    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in findUserByEmail (error request)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error()); // Replace

    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should find user by id', async () => {
    const user = await service.getUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });
  it('should return error in findUserByID', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined); // Replace

    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in getUserById (error request)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error()); // Replace

    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should find user getUserByIdUsingRelactions', async () => {
    const user = await service.getUserByUsingRelations(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should create a user', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(undefined);

    const user = await service.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });
});
