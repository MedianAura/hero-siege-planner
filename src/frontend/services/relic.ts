import { registry } from 'tsyringe';
import axios from 'axios';
import { InjectFromStore } from 'di-manager';
import { RelicStore } from '../stores/relic';
import { Relic } from '../../core/models/relic';

@registry([{ token: 'RelicService', useClass: RelicService }])
export class RelicService {
  @InjectFromStore('RelicStore')
  private readonly relicStore!: RelicStore;

  public async fetchRelics(): Promise<void> {
    const response = await axios.get<Relic[]>('http://localhost:3500/relics');
    this.relicStore.setRelics(response.data.map((d) => Relic.fromJSON(d)));

    const search = document.location.search;
    if (search.includes('relic=')) {
      const searchParam = new URLSearchParams(document.location.search);
      const relic: any = JSON.parse(atob(decodeURIComponent(searchParam.get('relic') as string)));
      this.setDefaultRelic(relic);
    }
  }

  public setDefaultRelic(relicIds: number[]): void {
    relicIds.forEach((id) => {
      const relic = this.relicStore.relics.find((r) => r.id === id);
      if (relic) {
        this.selectRelic(relic);
      }
    });
  }

  public doSearch(needle: string): void {
    if (needle.length < 3) {
      this.relicStore.setNeedle('');
      return;
    }

    this.relicStore.setNeedle(needle.toLowerCase());
  }

  public setCategoriesFilter(categories: string[]): void {
    this.relicStore.setCategoriesFilter(categories);
  }

  public setStatsFilter(stats: string[]): void {
    this.relicStore.setStatsFilter(stats);
  }

  public selectRelic(relic: Relic): void {
    let index;
    if (relic.selected) {
      // Retirer une relic
      index = this.getRelicPosition(relic);
      relic.selected = false;
      this.relicStore.removeRelicToSlot(index);
      return;
    }

    // Ajouter une relic
    if (!this.hasRelicSlotAvailabble()) return;

    relic.selected = true;
    index = this.getEmptyRelicSlot();
    this.relicStore.addRelicToSlot({ relic: relic, slot: index });
  }

  private hasRelicSlotAvailabble(): boolean {
    return this.getEmptyRelicSlot() > -1;
  }

  private getEmptyRelicSlot(): number {
    return this.relicStore.userRelics.findIndex((slot) => typeof slot === 'undefined');
  }

  private getRelicPosition(relic: Relic): number {
    return this.relicStore.userRelics.findIndex((slot) => slot === relic);
  }
}
