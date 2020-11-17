<template>
  <div class="breed-info-container">
    <v-progress-linear
      v-if="$apollo.queries.breedInformation.loading"
    ></v-progress-linear>
    <v-card
      v-if="!$apollo.queries.breedInformation.loading && !breedName"
      style="width: 100%"
      ><p>No Breed Info Found</p></v-card
    >

    <div v-if="breedName != undefined">
      <v-card>
        <p class="title">{{ breedName }}</p>
        <div class="table-container">
          <table class="table">
            <tr
              v-for="key in Object.keys(infoObject).filter((curr) =>
                Boolean(infoObject[curr])
              )"
              :key="key"
            >
              <td>{{ key }}</td>
              <td>{{ infoObject[key] }}</td>
            </tr>
          </table>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'BreedInfo',
  props: ['breed'],
  apollo: {
    breedInformation: {
      query: gql`
        query($breed: String!) {
          breedInformation(breed: $breed) {
            bred_for
            breed_group
            height {
              imperial
            }
            weight {
              imperial
            }
            life_span
            name
            temperament
          }
        }
      `,
      variables() {
        return {
          breed: this.breed,
        }
      },
      skip() {
        return !this.breed
      },
    },
  },
  computed: {
    breedName() {
      return this.breedInformation && this.breedInformation.name
    },
    infoObject() {
      if (!this.breedInformation) {
        return {}
      }
      const {
        // eslint-disable-next-line
        bred_for,
        // eslint-disable-next-line
        breed_group,
        height,
        weight,
        // eslint-disable-next-line
        life_span,
        temperament,
      } = this.breedInformation
      return {
        'Bred For': bred_for,
        'Breed Group': breed_group,
        Height: `${height.imperial} in`,
        Weight: `${weight.imperial} lbs`,
        'Life Span': life_span,
        Temperament: temperament,
      }
    },
  },
}
</script>
<style scoped>
.breed-info-container {
  min-width: 400px;
}
.v-card {
  padding: 20px;
}

table,
td,
.table-container {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-collapse: collapse;
}
td {
  padding: 10px;
}
p {
  margin: 0px;
}
</style>
