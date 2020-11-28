<template>
  <div class="user-relics">
    <div style="width: 505px; margin: auto">
      <div class="columns" v-for="row in displaySlot">
        <div class="column" v-for="relic in row">
          <div class="user-relic">
            <template v-if="isValidRelic(relic)">
              <b-image :src="relic.image">
                <b-skeleton class="skeleton-placeholder" slot="placeholder" height="100%"></b-skeleton>
              </b-image>
            </template>
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container has-text-centered">
        <b-button @click="generateURL">URL</b-button>
        <b-button @click="isSummaryActive = !isSummaryActive">Summary</b-button>
      </div>
    </section>

    <b-modal v-model="isSummaryActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <template v-for="row in displaySlot">
              <template v-for="relic in row">
                <template v-if="isValidRelic(relic)">
                  <div class="summary-relic">
                    <div class="has-text-weight-bold">{{ relic.name }}</div>
                    <div>{{ relic.stats }}</div>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { flatten } from 'lodash';
import { InjectFromContainer } from 'di-manager';
import { RelicService } from '../../services/relic';
import { Relic } from '../../../core/models/relic';

const RelicStoreDecorator = namespace('RelicStore');

@Component
export default class UserListRelic extends Vue {
  @InjectFromContainer('RelicService')
  public relicService: RelicService;

  @RelicStoreDecorator.Getter
  public displaySlot!: Relic[][];

  public isSummaryActive: boolean = false;

  public isValidRelic(relic: Relic): boolean {
    return relic instanceof Relic;
  }

  public generateURL(): void {
    const ids = flatten(this.displaySlot)
      .filter((relic) => relic !== undefined)
      .map((r) => r.id);

    const url = encodeURIComponent(btoa(JSON.stringify(ids)));
    document.location.href = document.location.href.replace(document.location.search, '') + '?relic=' + url;
  }
}
</script>

<style lang="scss">
.user-relics {
  .column {
    padding: 0;
    margin: 0;

    .user-relic {
      width: 96px;
      height: 96px;
      border: 1px solid #999999;
      border-radius: 10px;
      margin: 5px;

      img {
        height: 94px !important;
        width: 94px !important;
      }
    }
  }
}

.summary-relic {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>
