import { cityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDTO } from '../dto/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressMock: CreateAddressDTO = {
  cityId: cityMock.id,
  complement: addressMock.complement,
  cep: addressMock.cep,
  numberAddress: addressMock.numberAddress,
};
