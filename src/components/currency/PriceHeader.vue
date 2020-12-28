<template>
  <v-row justify="center" align-content="center">
    <v-card outlined tile width="900" class="mx-3" color="secondary" dark>
      <v-row dense>
        <!-- <v-col>
          Exchange
        </v-col> -->
        <v-col align-self="center">
          Bid
        </v-col>
        <v-col align-self="center">
          Ask
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PriceHeader",
});
</script>
