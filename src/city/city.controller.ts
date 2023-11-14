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
    const cachedCities: CityEntity[] = await this.cacheManager.get(
      `state_${stateId}`,
    );


    // Check if has cities on cache
    if (cachedCities) {
      return cachedCities;
    }

    // Get all cities
    const cities = await this.cityService.getAllCitiesByStateId(stateId);

    //Save data on Cache
    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
