import { Injectable } from '@nestjs/common';
import data from '@root/public/data/relics.json';
import { Relic } from '@core/models/relic';

@Injectable()
export class RelicsService {
  private readonly relics: Relic[] = [];

  constructor() {
    this.relics = data.map((d) => Relic.fromJSON(d));
  }

  public findAll(): Relic[] {
    return this.relics;
  }
}
