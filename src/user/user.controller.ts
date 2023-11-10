import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
// Create a new Controller
// command: nest g controller <<controllerName>>

// Controller are responsible for receiving and sending information
@Controller('user')
export class UserController {
  // Constructor should be access all services
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
  // Method post recive parameters
  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
}
