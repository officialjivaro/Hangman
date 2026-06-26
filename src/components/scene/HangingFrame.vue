<template>
  <g class="hanging-frame">
    <TwistedBranch v-if="frameId === 'twisted-branch'" />
    <CrookedGallows v-else />
  </g>
</template>

<script setup>
import CrookedGallows from './frames/CrookedGallows.vue'
import TwistedBranch from './frames/TwistedBranch.vue'

defineProps({
  frameId: {
    type: String,
    default: 'crooked-gallows'
  }
})
</script>
