import { Controller, Get } from '@nestjs/common';
// Create a new Controller
// command: nest g controller <<controllerName>>

// Controller are responsible for receiving and sending information
@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return JSON.stringify({ teste: 'Abc' });
  }
}
