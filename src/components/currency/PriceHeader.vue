<template>
  <v-row justify="center" align-content="center">
    <v-card outlined tile width="900" class="mx-6" color="indigo lighten-4">
      <v-row>
        <v-col class="text-body-1">
          Exchange
        </v-col>
        <v-col>
          Low
        </v-col>
        <v-col>
          High
        </v-col>
        <v-col>
          Vo
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
