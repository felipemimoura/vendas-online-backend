import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Create a new Module to project
// command: nest g module <<moduleName>>
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
