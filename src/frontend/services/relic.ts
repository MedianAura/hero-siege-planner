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
  }

  public doSearch(needle: string): void {
    if (needle.length < 3) {
      this.relicStore.setNeedle('');
      return;
    }

    this.relicStore.setNeedle(needle.toLowerCase());
  }
}
