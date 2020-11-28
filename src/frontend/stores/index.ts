import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { registerStores } from 'di-manager';
import { RelicStore } from './relic';

Vue.use(Vuex);

export const store = new Store({});

registerStores([{ name: 'RelicStore', Module: RelicStore }], store);
