<template>
  <v-app>
    <v-app-bar app dense>
      <div class="text-h6 d-flex align-center ">
        Arb
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <DashBoard />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import DashBoard from "./components/DashBoard.vue";

export default Vue.extend({
  name: "App",

  components: {
    DashBoard,
  },

  data: () => ({
    //
  }),
});
</script>
