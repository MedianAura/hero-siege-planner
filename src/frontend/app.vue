<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~bulma/bulma';
@import '~buefy/dist/buefy.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
