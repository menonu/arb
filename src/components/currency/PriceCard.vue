<template>
  <v-row justify="center" align-content="center">
    <v-card outlined tile width="900" class="px-3 mx-3">
      <v-row dense>
        <v-col class="text-body-1" cols="12" md="3">
          {{ prices.exchange }}
        </v-col>
        <v-col>
          <div class="text-caption font-weight-thin">
            {{ prices.bid.toFixed(digits) }}
          </div>
          <div v-if="prices.usdbid" class="text-caption font-weight-thin">
            {{ prices.usdbid.toFixed(4) }}
          </div>
          <div class="text-h6">
            {{ prices.refinedbid.toFixed(digits) }}
          </div>
        </v-col>
        <v-col>
          <div class="text-caption font-weight-thin">
            {{ prices.ask.toFixed(digits) }}
          </div>
          <div v-if="prices.usdask" class="text-caption font-weight-thin">
            {{ prices.usdask.toFixed(4) }}
          </div>
          <div class="text-h6">
            {{ prices.refinedask.toFixed(digits) }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Price } from "./logic/currency";

export interface RefinedPrice extends Price {
  refinedask: number;
  refinedbid: number;
  usdask?: number;
  usdbid?: number;
}

export default Vue.extend({
  name: "PriceCard",
  props: {
    prices: Object as PropType<Price>,
    digits: {
      type: Number,
      default: 8,
    },
  },

  computed: {
    LowAsk() {
      return 1;
    },
    HighBid() {
      return 1;
    },
  },
});
</script>
