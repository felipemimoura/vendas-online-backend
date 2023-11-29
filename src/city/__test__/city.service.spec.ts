import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('StateService', () => {
  let service: CityService;
  // Repository mock
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should be return a city by id', async () => {
    const city = await service.getCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });
  it('should be return error ir city not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.getCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should be return all cities by state', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.id);

    expect(city).toEqual([cityMock]);
  });
});
