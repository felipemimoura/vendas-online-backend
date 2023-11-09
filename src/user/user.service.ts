import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

// Create a new Service
// command: nest g service <<controllerName>>

// Controller are responsible for receiving to logic about application
@Injectable()
export class UserService {
  private users: IUser[] = [];
  async createUser(createUser: CreateUserDTO): Promise<IUser> {
    // Create password cryptography
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(createUser.password, saltOrRounds);

    const user: IUser = {
      ...createUser,
      id: this.users.length + 1,
      password: passwordHashed,
    };

    this.users.push(user);

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }
}
