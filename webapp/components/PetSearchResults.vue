<template>
  <v-container fluid class="root">
    <v-progress-linear
      v-if="$apollo.queries.animals.loading"
      indeterminate
    ></v-progress-linear>
    <v-row>
      <v-col
        v-for="animal in animalsWithPhotos"
        :key="animal.id"
        cols="6"
        sm="4"
        md="3"
      >
        <v-card :title="animal.name" @click="selectPet(animal)">
          <v-img aspect-ratio="1" :src="animal.photos[0].full">
            <div class="pet-overlay-container">
              <v-card-text class="pet-overlay">
                <p class="pet-name">{{ animal.name }}</p>
                <p class="pet-breed" :title="formatBreed(animal.breeds)">
                  {{ formatBreed(animal.breeds) }}
                </p>
              </v-card-text>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import { formatBreed } from '../assets/scripts/string-format'
export default {
  name: 'PetSearchResults',
  apollo: {
    animals: {
      query: gql`
        query(
          $location: String
          $age: [AgeListItem]
          $gender: [GenderListItem]
        ) {
          animals(
            type: DOG
            limit: 40
            location: $location
            age: $age
            gender: $gender
          ) {
            animals {
              name
              photos {
                full
              }
              id
              breeds {
                primary
                secondary
                unknown
                mixed
              }
            }
          }
        }
      `,
      variables() {
        return this.$route.query
      },
    },
  },
  computed: {
    animalsWithPhotos() {
      if (!this.animals) return []
      return this.animals.animals.filter((animal) => animal.photos.length !== 0)
    },
    ...mapState(['selectedPet']),
  },
  methods: {
    selectPet(animal) {
      this.$store.commit('setSelectedPet', animal.id)
    },
    formatBreed,
  },
}
</script>
<style scoped>
.root {
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding-top: 0px;
}
.pet-overlay-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0px;
}
.pet-overlay {
  padding: 4px 16px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 20%,
    rgba(0, 0, 0, 0.8) 100%
  );
}
.pet-overlay * {
  margin: 0px;
  padding: 0px;
}
.pet-name {
  color: var(--v-primary-base);
  font-size: 1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.pet-breed {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
