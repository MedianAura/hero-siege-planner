<template>
  <div @click="selectRelic">
    <div class="relic" :class="{ 'relic-selected': relic.selected }">
      <div class="columns">
        <div class="column is-2">
          <b-image :src="relic.image">
            <b-skeleton class="skeleton-placeholder" slot="placeholder" height="100%"></b-skeleton>
          </b-image>
        </div>
        <div class="column">
          <div>{{ relic.name }}</div>
          <div>{{ relic.category }}</div>
          <div>{{ relic.stats }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Relic } from '../../../core/models/relic';

@Component
export default class RelicItem extends Vue {
  @Prop({ default: () => new Relic() })
  public relic: Relic;

  @Emit('select')
  public selectRelic(): Relic {
    return this.relic;
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

.relic-selected {
  background-color: rgb(0, 80, 0, 0.4);
}
</style>
