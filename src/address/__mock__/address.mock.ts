import { userEntityMock } from '../..//user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  cep: '07854090',
  cityId: cityMock.id,
  complement: 'complmento',
  createdAt: new Date(),
  id: 1231,
  numberAddress: 123,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
