import { Controller, Get } from '@nestjs/common';
import { RelicsService } from './relics.service';
import { Relic } from '@core/models/relic';

@Controller('relics')
export class RelicsController {
  constructor(private readonly relicsService: RelicsService) {}

  @Get()
  async findAll(): Promise<Relic[]> {
    return this.relicsService.findAll();
  }
}
