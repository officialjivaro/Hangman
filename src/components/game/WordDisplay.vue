<template>
  <section class="word-display" aria-label="Word to guess">
    <span class="sr-only">{{ accessibleWord }}</span>
    <div
      class="word-display__slots"
      :class="{ 'word-display__slots--compact': characters.length > 13 }"
      :style="{ '--slot-count': Math.max(characters.length, 1) }"
      aria-hidden="true"
    >
      <span
        v-for="(character, index) in characters"
        :key="`${index}-${character}`"
        class="word-display__slot"
        :class="{
          'word-display__slot--hidden': character === '_',
          'word-display__slot--separator': !/[A-Z_]/.test(character)
        }"
      >
        {{ character === '_' ? '•' : character }}
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  characters: {
    type: Array,
    default: () => []
  }
})

const accessibleWord = computed(() => {
  return props.characters
    .map(character => character === '_' ? 'blank' : character)
    .join(' ')
})
</script>

<style scoped>
.word-display {
  width: 100%;
  padding: 0.75rem 0.8rem;
  border: 1px solid var(--theme-border);
  border-radius: 0.85rem 1.1rem 0.8rem 1rem;
  background: color-mix(in srgb, var(--theme-surface-strong) 84%, transparent);
  box-shadow: inset 0 0 1.2rem rgba(0, 0, 0, 0.2);
}

.word-display__slots {
  display: grid;
  grid-template-columns: repeat(var(--slot-count), minmax(0, 1fr));
  align-items: end;
  gap: clamp(0.16rem, 0.55vw, 0.48rem);
  width: 100%;
  min-width: 0;
}

.word-display__slot {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: clamp(2rem, 5dvh, 3.25rem);
  border-bottom: 2px solid color-mix(in srgb, var(--theme-accent) 72%, var(--theme-text));
  color: var(--theme-text);
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 3.2vw, 2.05rem);
  font-weight: 900;
  line-height: 1;
  text-shadow: 0.08rem 0.12rem 0 rgba(0, 0, 0, 0.7);
}

.word-display__slot--hidden {
  color: color-mix(in srgb, var(--theme-muted) 58%, transparent);
  font-size: 0.82rem;
}

.word-display__slot--separator {
  border-bottom-color: transparent;
}

.word-display__slots--compact .word-display__slot {
  font-size: clamp(0.78rem, 2.25vw, 1.35rem);
}

@media (max-width: 480px) {
  .word-display {
    padding: 0.5rem 0.45rem;
  }

  .word-display__slot {
    min-height: 1.75rem;
    font-size: clamp(0.82rem, 4.3vw, 1.35rem);
  }

  .word-display__slots--compact .word-display__slot {
    font-size: clamp(0.62rem, 3.2vw, 0.95rem);
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .word-display {
    padding: 0.38rem 0.48rem;
  }

  .word-display__slot {
    min-height: 1.55rem;
    font-size: clamp(0.72rem, 2.2vw, 1.05rem);
  }
}
</style>
