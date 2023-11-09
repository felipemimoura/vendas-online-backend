import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
// Create a new Controller
// command: nest g controller <<controllerName>>

// Controller are responsible for receiving and sending information
@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return JSON.stringify({ teste: 'Abc' });
  }
  // Method post recived parameters
  @Post()
  async createUser(@Body() createUser: CreateUserDTO) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
