import { Module } from '@nestjs/common';
import { RelicsController } from './relics.controller';
import { RelicsService } from './relics.service';

@Module({
  controllers: [RelicsController],
  providers: [RelicsService]
})
export class RelicsModule {}
