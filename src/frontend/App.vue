<template>
  <div id="app">
    {{ test }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public test: string = 'yooo';
}
</script>

<style lang="less"></style>
