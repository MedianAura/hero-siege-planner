<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <RelicList></RelicList>
        </div>

        <div class="column"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RelicList from '../components/relics/list.vue';

@Component({
  components: { RelicList },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.relic {
  border: 1px solid #333333;
  border-radius: 10px;
  padding: 10px 0;
  margin: 15px 0;
}
</style>
