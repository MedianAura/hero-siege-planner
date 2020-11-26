<template>
  <div id="app">
    {{ test }}
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";

@Component
export default class App {
  public test: string = 'yooo';
}
</script>

<style lang="less"></style>
