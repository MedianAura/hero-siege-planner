<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Relics</h1>

      <div class="columns relic" v-for="relic in relics" :key="relic.name">
        <div class="column is-1">
          <b-image :src="relic.image">
            <b-skeleton class="skeleton-placeholder" slot="placeholder" height="100%"></b-skeleton>
          </b-image>
        </div>
        <div class="column">
          <h1 class="title">{{ relic.name }}</h1>
          <h2 class="subtitle">
            {{ relic.stats }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Relic } from '../../core/models/relic';

@Component
export default class Home extends Vue {
  public relics: Relic[] = [];

  public async mounted(): Promise<void> {
    const response = await axios.get<Relic[]>('http://localhost:3500/relics');
    this.relics = response.data.map((d) => Relic.fromJSON(d));
  }
}
</script>

<style lang="scss">
.relic {
  border: 1px solid #333333;
  border-radius: 10px;
  padding: 10px 0;
  margin: 15px 0;
}
</style>
