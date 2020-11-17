<template>
  <div class="app-area">
    <div class="result-area" :class="{ shrink: selectedPet }">
      <PetSearchResults />
    </div>

    <div class="pet-display-area" :class="{ open: selectedPet }">
      <PetDisplay />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PetSearchResults from '../components/PetSearchResults'
import PetDisplay from '../components/PetDisplay'

export default {
  components: {
    PetSearchResults,
    PetDisplay,
  },
  computed: {
    ...mapState({ selectedPet: 'selectedPet' }),
  },
}
</script>
<style scoped>
.app-area {
  max-width: 100vw;
  max-height: calc(100vh - 64px);
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
}
.pet-display-area {
  transition: 1s;
  width: 0;
}
.pet-display-area.open {
  width: 350px;
}
.result-area {
  transition: 1s;
  width: 100%;
  height: 100%;
}
.result-area.shrink {
  width: calc(100% - 350px);
}
</style>
