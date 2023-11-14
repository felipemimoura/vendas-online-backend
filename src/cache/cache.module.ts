import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheMOduleNest } from '@nestjs/cache-manager';

@Module({
  imports: [CacheMOduleNest.register({ ttl: 9000000 })],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
