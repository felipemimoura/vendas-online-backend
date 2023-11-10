import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Create a new Service
// command: nest g service <<serviceName>>

// service are responsible for receiving to logic about application
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
    // Create password cryptography
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(createUser.password, saltOrRounds);

    // Save data into the database
    return this.userRepository.save({
      ...createUser,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    // Return all data from database
    return this.userRepository.find();
  }
}
