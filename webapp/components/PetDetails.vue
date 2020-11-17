<template>
  <div>
    <div class="breed-text-wrapper">
      <p v-if="breedsArray.length === 0">Mixed Breed</p>
      <div v-if="breedsArray[0]" class="breed-text-wrapper">
        <p>{{ breedsArray[0] }}</p>
        <v-menu open-on-hover :close-on-content-click="false" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" small v-on="on">
              mdi-help-circle-outline
            </v-icon>
          </template>
          <BreedInfo :breed="breedsArray[0]" />
        </v-menu>
      </div>
    </div>

    <div v-if="breedsArray[1]" class="breed-text-wrapper">
      <p>&nbsp;/ {{ breedsArray[1] }}</p>
      <v-menu open-on-hover :close-on-content-click="false" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" small v-on="on">
            mdi-help-circle-outline
          </v-icon>
        </template>
        <BreedInfo :breed="breedsArray[1]" />
      </v-menu>
    </div>
    <p v-if="mixed">&nbsp;Mix</p>
  </div>
</template>

<script>
import BreedInfo from './BreedInfo'
export default {
  name: 'PetDetails',
  components: {
    BreedInfo,
  },
  props: ['breeds'],
  computed: {
    breedsArray() {
      console.log(
        [this.breeds.primary, this.breeds.secondary].filter((breed) => {
          return breed && breed.toLowerCase() !== 'mixed breed'
        })
      )
      return [this.breeds.primary, this.breeds.secondary].filter((breed) => {
        return breed && breed.toLowerCase() !== 'mixed breed'
      })
    },
    breedText() {
      if (
        this.breeds.unknown ||
        (this.breeds.primary &&
          this.breeds.primary.toLowerCase() === 'mixed breed')
      )
        return 'Mixed Breed'
      let breedText = this.breeds.primary
      if (
        this.breeds.secondary &&
        this.breeds.secondary.toLowerCase() !== 'mixed breed'
      ) {
        breedText += ` / ${this.breeds.secondary}`
      }
      if (this.breeds.mixed) {
        breedText += ' Mix'
      }
      return breedText
    },
    mixed() {
      return this.breeds.mixed
    },
  },
}
</script>

<style scoped>
div {
  display: flex;
}
p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.v-icon {
  height: fit-content;
}
.icon-wrapper {
  height: '100%';
}
.breed-text-wrapper {
  display: flex;
}
</style>
