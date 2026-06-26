<template>
  <section class="game-keyboard" aria-label="Letter keyboard">
    <button
      v-for="letter in letters"
      :key="letter"
      class="game-keyboard__key"
      :class="getLetterClass(letter)"
      :disabled="disabled || guessedLetters.includes(letter)"
      :aria-label="getAriaLabel(letter)"
      type="button"
      @click="$emit('guess', letter)"
    >
      <span>{{ letter }}</span>
      <small v-if="correctLetters.includes(letter)" aria-hidden="true">✓</small>
      <small v-else-if="wrongLetters.includes(letter)" aria-hidden="true">×</small>
    </button>
  </section>
</template>

<script setup>
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const props = defineProps({
  guessedLetters: {
    type: Array,
    default: () => []
  },
  correctLetters: {
    type: Array,
    default: () => []
  },
  wrongLetters: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['guess'])

function getLetterClass(letter) {
  return {
    'game-keyboard__key--correct': props.correctLetters.includes(letter),
    'game-keyboard__key--wrong': props.wrongLetters.includes(letter),
    'game-keyboard__key--guessed': props.guessedLetters.includes(letter)
  }
}

function getAriaLabel(letter) {
  if (props.correctLetters.includes(letter)) {
    return `${letter}, correct guess`
  }

  if (props.wrongLetters.includes(letter)) {
    return `${letter}, wrong guess`
  }

  return `Guess ${letter}`
}
</script>

<style scoped>
.game-keyboard {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: clamp(0.28rem, 0.7vw, 0.48rem);
  width: 100%;
  min-width: 0;
}

.game-keyboard__key {
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
  aspect-ratio: 1.05;
  padding: 0;
  border: 1px solid var(--theme-border);
  border-radius: 0.52rem 0.72rem 0.48rem 0.65rem;
  color: var(--theme-text);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--theme-surface) 78%, white), var(--theme-surface-strong));
  box-shadow: 0 0.24rem 0 rgba(0, 0, 0, 0.38), var(--shadow-small);
  font-weight: 900;
  cursor: pointer;
  transition:
    transform var(--transition-fast) ease,
    box-shadow var(--transition-fast) ease,
    filter var(--transition-fast) ease;
}

.game-keyboard__key:hover:not(:disabled) {
  z-index: 2;
  transform: translateY(-0.17rem) rotate(-0.5deg);
  box-shadow: 0 0.38rem 0 rgba(0, 0, 0, 0.36), var(--shadow-medium);
  filter: brightness(1.12);
}

.game-keyboard__key:disabled {
  cursor: not-allowed;
}

.game-keyboard__key small {
  position: absolute;
  top: 0.1rem;
  right: 0.16rem;
  font-size: 0.58rem;
  line-height: 1;
}

.game-keyboard__key--guessed {
  transform: translateY(0.1rem);
  box-shadow: 0 0.1rem 0 rgba(0, 0, 0, 0.36);
}

.game-keyboard__key--correct {
  border-color: color-mix(in srgb, var(--theme-success) 70%, white);
  color: #10170f;
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-success) 78%, white), var(--theme-success));
}

.game-keyboard__key--wrong {
  border-color: color-mix(in srgb, var(--theme-danger) 72%, white);
  color: #1c0e10;
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-danger) 76%, white), var(--theme-danger));
}

@media (max-width: 760px) {
  .game-keyboard {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: clamp(0.2rem, 1.2vw, 0.38rem);
  }

  .game-keyboard__key {
    min-height: clamp(2rem, 5.2dvh, 2.75rem);
    aspect-ratio: auto;
    font-size: clamp(0.76rem, 3.6vw, 1rem);
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .game-keyboard {
    grid-template-columns: repeat(13, minmax(0, 1fr));
    gap: 0.22rem;
  }

  .game-keyboard__key {
    min-height: 1.7rem;
    aspect-ratio: auto;
    border-radius: 0.38rem;
    font-size: 0.72rem;
    box-shadow: 0 0.12rem 0 rgba(0, 0, 0, 0.34);
  }
}
</style>
