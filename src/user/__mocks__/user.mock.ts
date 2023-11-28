import { UserEntity } from '../entites/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '1234567',
  createdAt: new Date(),
  email: 'email@email.com',
  id: 11,
  name: 'mock user',
  password: 'password',
  phone: '1144436556',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
