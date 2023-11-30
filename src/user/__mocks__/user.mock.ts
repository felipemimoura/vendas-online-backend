import { UserEntity } from '../entites/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '1234567',
  createdAt: new Date(),
  email: 'email@email.com',
  id: 11,
  name: 'mock user',
  password: '$2b$10$QLBcNAQxD6Rj4mnO7bpnpO11ZO5YzzR19DV.nE8xJ3LC1i95Q9WZq',
  phone: '1144436556',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
