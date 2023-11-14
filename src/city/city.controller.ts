import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByStateId(stateId);
  }
}
