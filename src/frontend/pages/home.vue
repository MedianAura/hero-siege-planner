<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Relics</h1>

      <div class="columns">
        <div class="column">
          <UserRelicList></UserRelicList>
        </div>

        <div class="column scrolling-panel">
          <RelicList></RelicList>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RelicList from '../components/relics/list.vue';
import UserRelicList from '../components/user-relics/list.vue';

@Component({
  components: { RelicList, UserRelicList },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.scrolling-panel {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
