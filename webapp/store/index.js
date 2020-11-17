export const state = () => ({
  selectedPet: null,
})
export const mutations = {
  setSelectedPet(state, pet) {
    state.selectedPet = pet
  },
}
export const actions = {
  setSelectedPet(context, payload) {
    context.commit('setSelectedPet', payload)
  },
}
