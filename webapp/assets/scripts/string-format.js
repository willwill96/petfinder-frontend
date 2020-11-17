export const formatBreed = (breeds) => {
  if (
    breeds.unknown ||
    (breeds.primary && breeds.primary.toLowerCase() === 'mixed breed')
  )
    return 'Mixed Breed'
  let breedText = breeds.primary
  if (breeds.secondary && breeds.secondary.toLowerCase() !== 'mixed breed') {
    breedText += ` / ${breeds.secondary}`
  }
  if (breeds.mixed) {
    breedText += ' Mix'
  }
  return breedText
}
