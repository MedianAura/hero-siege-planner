import { Module, Mutation, VuexModule } from 'vuex-class-modules';
import { Relic } from '../../core/models/relic';

@Module
export class RelicStore extends VuexModule {
  public relics: Relic[] = [];

  public needle: string = '';
  public categories: string[] = [];
  public stats: string[] = [];

  @Mutation
  public setRelics(relics: Relic[]): void {
    this.relics = relics;
  }

  @Mutation
  public setNeedle(needle: string): void {
    this.needle = needle;
  }

  @Mutation
  public setCategoriesFilter(categories: string[]): void {
    this.categories = categories;
  }

  @Mutation
  public setStatsFilter(stats: string[]): void {
    this.stats = stats;
  }

  public isNameMatching(relic: Relic, needle: string): boolean {
    if (needle === '') return true;
    return relic.name.toLowerCase().trim().includes(needle);
  }

  public isStatsMatching(relic: Relic, needle: string): boolean {
    if (needle === '') return true;
    return relic.stats.toLowerCase().trim().includes(needle);
  }

  public hasCategory(relic: Relic, categories: string[]): boolean {
    if (categories.length === 0) return true;
    return categories.includes(relic.category);
  }

  public hasStats(relic: Relic, stats: string[]): boolean {
    if (stats.length === 0) return true;

    return stats.some((stat) => {
      return stat.split(';').some((s) => {
        return relic.stats.match(new RegExp(s, 'gmi')) !== null;
      });
    });
  }

  get filteredRelics(): Relic[] {
    return this.relics.filter((relic) => {
      const matchNeedle = [this.isNameMatching(relic, this.needle), this.isStatsMatching(relic, this.needle)].some((r) => r === true);
      const matchCategory = [this.hasCategory(relic, this.categories)];
      const matchStats = [this.hasStats(relic, this.stats)];

      return [matchNeedle, ...matchCategory, ...matchStats].every((r) => r === true);
    });
  }
}
