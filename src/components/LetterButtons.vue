<template>
    <div class="letters">
      <button
        v-for="letter in letters"
        :key="letter"
        :class="{ guessed: guessedLetters.includes(letter) }"
        @click="onLetterClick(letter)"
      >
        {{ letter }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const props = defineProps({
    guessedLetters: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['guess'])
  const letters = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
  function onLetterClick(letter) {
    if (!props.guessedLetters.includes(letter)) {
      emits('guess', letter)
    }
  }
  </script>
  
  <style scoped>
  .letters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 300px;
    margin: 0 auto;
    justify-content: center;
  }
  button {
    padding: 8px;
    background-color: #ccc;
    border: none;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
  }
  button.guessed {
    background-color: #999;
  }
  </style>
  