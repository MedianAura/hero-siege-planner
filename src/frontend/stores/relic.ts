import { Module, Mutation, VuexModule } from 'vuex-class-modules';
import { Relic } from '../../core/models/relic';

@Module
export class RelicStore extends VuexModule {
  public relics: Relic[] = [];

  public needle: string = '';

  @Mutation
  public setRelics(relics: Relic[]): void {
    this.relics = relics;
  }

  @Mutation
  public setNeedle(needle: string): void {
    this.needle = needle;
  }

  public isNameMatching(relic: Relic, needle: string): boolean {
    if (needle === '') return true;
    return relic.name.toLowerCase().trim().includes(needle);
  }

  public isStatsMatching(relic: Relic, needle: string): boolean {
    if (needle === '') return true;
    return relic.stats.toLowerCase().trim().includes(needle);
  }

  get filteredRelics(): Relic[] {
    return this.relics.filter((relic) => {
      return [this.isNameMatching(relic, this.needle), this.isStatsMatching(relic, this.needle)].some((r) => r === true);
    });
  }
}
