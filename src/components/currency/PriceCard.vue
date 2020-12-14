<template>
  <v-row justify="center" align-content="center">
    <v-card outlined tile width="900" class="mx-6">
      <v-row>
        <v-col class="text-body-1">
          {{ prices.exchange }}
        </v-col>
        <v-col>
          {{ prices.bid.toFixed(digits) }}
        </v-col>
        <v-col>
          {{ prices.ask.toFixed(digits) }}
        </v-col>
        <v-col>
          {{ prices.vol }}
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Price } from "./logic/currency";

export default Vue.extend({
  name: "PriceCard",
  props: {
    prices: Object as PropType<Price>,
    digits: {
      type: Number,
      default: 9,
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
