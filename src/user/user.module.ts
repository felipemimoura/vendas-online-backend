import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

// Create a new Module to project
// command: nest g module <<moduleName>>
@Module({
  controllers: [UserController],
})
export class UserModule {}
