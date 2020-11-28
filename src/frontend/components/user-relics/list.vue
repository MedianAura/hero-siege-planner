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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
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

  public isValidRelic(relic: Relic): boolean {
    return relic instanceof Relic;
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
</style>
