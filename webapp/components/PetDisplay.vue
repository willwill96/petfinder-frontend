<template>
  <div v-if="animal" class="pet-display">
    <div class="pet-header">
      <v-icon large @click="clearPet"> mdi-chevron-double-left </v-icon>
      <div>
        <p :title="animal.name" class="title">{{ animal.name }}</p>
      </div>
    </div>
    <v-divider />
    <div class="portrait-container">
      <v-card>
        <v-carousel progress hide-delimiters style="height: 200px">
          <v-carousel-item v-for="(photo, i) in animal.photos" :key="i">
            <v-img :src="photo.full" style="width: 100%" aspect-ratio="1" />
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </div>
    <v-divider />

    <div class="pet-display-details">
      <PetDetails :breeds="animal.breeds" />
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import PetDetails from './PetDetails'
export default {
  name: 'PetDisplay',
  components: {
    PetDetails,
  },
  apollo: {
    animal: {
      query: gql`
        query animalById($id: Int!) {
          animal(id: $id) {
            name
            photos {
              full
            }
            breeds {
              primary
              secondary
              mixed
              unknown
            }
            id
          }
        }
      `,
      variables() {
        return {
          id: this.selectedPet,
        }
      },
      skip() {
        return this.selectedPet == null
      },
    },
  },
  computed: {
    ...mapState(['selectedPet']),
  },
  methods: {
    clearPet() {
      this.$store.dispatch('setSelectedPet', null)
    },
  },
}
</script>
<style scoped>
.pet-display {
  width: 350px;
  height: 100%;
  position: fixed;
  background-color: var(--v-secondary-base);
}
.pet-header {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px;
  white-space: nowrap;
}
p {
  margin: 0;
}
.portrait-container {
  width: 250px;
  margin: auto;
  padding: 12px 0px;
}
.pet-display-details {
  padding: 12px;
}
</style>
