import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserService } from './user.service';
// Create a new Controller
// command: nest g controller <<controllerName>>

// Controller are responsible for receiving and sending information
@Controller('user')
export class UserController {
  // Constructor should be access all services
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @UsePipes(ValidationPipe)
  @Post() // Method post recive parameters
  async createUser(@Body() createUser: CreateUserDTO): Promise<ReturnUserDto> {
    return this.userService.createUser(createUser);
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByUsingRelations(userId),
    );
  }
}
