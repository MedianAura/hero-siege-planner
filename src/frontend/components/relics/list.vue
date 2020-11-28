<template>
  <div>
    <h1 class="title is-1">Relics</h1>

    <b-field>
      <b-input v-model="needle" size="is-medium" placeholder="Search..." type="search"></b-input>
    </b-field>

    <div class="relic" v-for="relic in filteredRelics" :key="relic.name">
      <RelicItem class="columns is-mobile" :relic="relic"></RelicItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { InjectFromContainer } from 'di-manager';
import RelicItem from './item.vue';
import { RelicService } from '../../services/relic';
import { Relic } from '../../../core/models/relic';
import { Debounce } from 'lodash-decorators';

const RelicStoreDecorator = namespace('RelicStore');

@Component({
  components: { RelicItem },
})
export default class ListRelic extends Vue {
  @InjectFromContainer('RelicService')
  public relicService: RelicService;

  @RelicStoreDecorator.Getter
  public filteredRelics!: Relic[];

  public needle: string = '';

  public mounted(): void {
    this.relicService.fetchRelics();
  }

  @Watch('needle')
  @Debounce(200)
  public doSearch(): void {
    this.relicService.doSearch(this.needle);
  }
}
</script>

<style lang="scss" scoped>
.relic {
  border: 1px solid #333333;
  border-radius: 10px;
  padding: 10px 0;
  margin: 15px 0;
}
</style>
