<template>
  <v-app dark>
    <v-app-bar app color="primary">
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style scoped>
.v-app-bar {
  height: 50px !important;
}
.v-main {
  padding-top: 50px !important;
}
</style>
<style>
*,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  scrollbar-width: thin;
  scrollbar-color: white rgba(0, 0, 0, 0);
}
/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
*::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: white;
  border-radius: 20px;
  border: 3px solid rgba(0, 0, 0, 0);
}
</style>
