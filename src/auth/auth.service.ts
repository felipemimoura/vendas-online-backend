import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entites/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerive: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userSerive
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    // Check if password is valid
    const isMatch = await compare(loginDTO.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    const payload = new LoginPayload(user);

    return {
      accessToken: this.jwtService.sign({ ...payload }),
      user: new ReturnUserDto(user),
    };
  }
}
