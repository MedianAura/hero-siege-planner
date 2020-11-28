<template>
  <div>
    <div class="column is-2">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Relic } from '../../../core/models/relic';

@Component
export default class RelicItem extends Vue {
  @Prop({ default: () => new Relic() })
  public relic: Relic;
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
