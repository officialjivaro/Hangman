<template>
  <g class="hangman-character" :transform="`translate(${x} ${y})`">
    <StitchedRagdoll
      v-if="characterId === 'stitched-ragdoll'"
      :wrong-guesses="wrongGuesses"
    />
    <ClassicStickman
      v-else
      :wrong-guesses="wrongGuesses"
    />
  </g>
</template>

<script setup>
import ClassicStickman from './characters/ClassicStickman.vue'
import StitchedRagdoll from './characters/StitchedRagdoll.vue'

defineProps({
  characterId: {
    type: String,
    default: 'classic-stickman'
  },
  wrongGuesses: {
    type: Number,
    default: 0
  },
  x: {
    type: Number,
    default: 520
  },
  y: {
    type: Number,
    default: 214
  }
})
</script>
