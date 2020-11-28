<template>
  <div>
    <h1 class="title is-1">Relics</h1>

    <b-field>
      <b-input v-model="needle" size="is-medium" placeholder="Search..." type="search"></b-input>
    </b-field>

    <section class="columns">
      <div class="column">
        <h3 class="has-text-weight-bold">Category</h3>

        <b-field>
          <b-checkbox v-model="categories" native-value="Orbiting"> Orbiting</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="categories" native-value="Following"> Following</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="categories" native-value="Active"> Active</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="categories" native-value="On Hit (Proc)/Passive"> On Hit (Proc)/Passive</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="categories" native-value="Stat/Passive Modifiers"> Stat/Passive Modifiers</b-checkbox>
        </b-field>
      </div>

      <div class="column">
        <h3 class="has-text-weight-bold">Stats filter</h3>

        <b-field>
          <b-checkbox v-model="stats" native-value="Flight"> Flight</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="stats" native-value="Magic Find"> Magic Find</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="stats" native-value="\+\d* Speed"> Speed</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="stats" native-value="Attack Speed"> Attack Speed</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="stats" native-value="All Stats"> All Stats</b-checkbox>
        </b-field>

        <div class="children-checkbox">
          <b-field>
            <b-checkbox v-model="stats" native-value="Strength;All Stats"> Strength</b-checkbox>
          </b-field>

          <b-field>
            <b-checkbox v-model="stats" native-value="Stamina;All Stats"> Stamina</b-checkbox>
          </b-field>

          <b-field>
            <b-checkbox v-model="stats" native-value="Energy;All Stats"> Energy</b-checkbox>
          </b-field>

          <b-field>
            <b-checkbox v-model="stats" native-value="Armor;All Stats"> Armor</b-checkbox>
          </b-field>
        </div>

        <b-field>
          <b-checkbox v-model="stats" native-value="Total Damage"> Total Damage</b-checkbox>
        </b-field>

        <b-field>
          <b-checkbox v-model="stats" native-value="All Talents"> All Talents</b-checkbox>
        </b-field>
      </div>
    </section>

    <div class="relic" v-for="relic in filteredRelics" :key="relic.name">
      <RelicItem class="columns is-mobile" :relic="relic"></RelicItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Debounce } from 'lodash-decorators';
import { InjectFromContainer } from 'di-manager';
import RelicItem from './item.vue';
import { RelicService } from '../../services/relic';
import { Relic } from '../../../core/models/relic';

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
  public categories: string[] = [];
  public stats: string[] = [];

  public mounted(): void {
    this.relicService.fetchRelics();
  }

  @Watch('needle')
  @Debounce(200)
  public doSearch(): void {
    this.relicService.doSearch(this.needle);
  }

  @Watch('categories')
  public setCategoriesFilter(): void {
    this.relicService.setCategoriesFilter(this.categories);
  }

  @Watch('stats')
  public setStatsFilter(): void {
    this.relicService.setStatsFilter(this.stats);
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

.children-checkbox {
  margin-left: 30px;
  margin-bottom: 0.75rem;
}
</style>
