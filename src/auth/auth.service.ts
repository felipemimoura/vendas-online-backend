import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entites/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userSerive: UserService) {}
  async login(loginDTO: LoginDTO): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userSerive
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    // Check if password is valid
    const isMatch = await compare(loginDTO.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return user;
  }
}
