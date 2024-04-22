import { rollDetails } from '../data.js'

export function load({ params }) {
  return {
    props: {
      roll: rollDetails.find((roll) => roll.slug === params.slug),
    },
  }
}