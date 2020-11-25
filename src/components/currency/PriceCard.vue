<template>
  <v-row justify="center" align-content="center">
    <v-card outlined tile width="900" class="mx-6">
      <v-row>
        <v-col class="text-body-1">
          {{ info.exchange }}
        </v-col>
        <v-col>
          {{ info.low }}
        </v-col>
        <v-col>
          b
        </v-col>
        <v-col>
          b
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PriceCard",
  props: ["info"],
});
</script>
