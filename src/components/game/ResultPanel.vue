<template>
  <section
    class="result-panel"
    :class="gameWon ? 'result-panel--win' : 'result-panel--loss'"
    aria-labelledby="result-title"
  >
    <span class="result-panel__kicker">Round complete</span>
    <h2 id="result-title">{{ gameWon ? 'You escaped the noose!' : 'The shadows won this one.' }}</h2>

    <p class="result-panel__word" v-if="gameWon || revealOnFail">
      {{ word }}
    </p>
    <p class="result-panel__word result-panel__word--hidden" v-else>
      Answer hidden
    </p>

    <p class="result-panel__meta">{{ category }} · {{ difficulty }}</p>

    <p v-if="gameWon && definition" class="result-panel__definition" :title="definition">
      {{ definition }}
    </p>

    <div class="result-panel__actions">
      <BaseButton variant="primary" @click="$emit('new-word')">
        New Word
      </BaseButton>
      <BaseButton variant="secondary" @click="$emit('home')">
        Return to Main
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue'

defineProps({
  gameWon: {
    type: Boolean,
    default: false
  },
  word: {
    type: String,
    default: ''
  },
  revealOnFail: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    default: ''
  },
  definition: {
    type: String,
    default: ''
  }
})

defineEmits(['new-word', 'home'])
</script>

<style scoped>
.result-panel {
  display: grid;
  align-content: center;
  gap: 0.55rem;
  height: 100%;
  min-height: 0;
  padding: clamp(0.9rem, 2.5vw, 1.45rem);
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: 1.15rem 0.9rem 1.35rem 0.85rem;
  color: var(--theme-text);
  background:
    linear-gradient(140deg, color-mix(in srgb, var(--theme-surface) 92%, transparent), var(--theme-surface-strong));
  box-shadow: var(--shadow-medium);
  text-align: center;
  animation: resultArrive 360ms cubic-bezier(0.2, 0.9, 0.25, 1.2) both;
}

.result-panel--win {
  border-color: color-mix(in srgb, var(--theme-success) 65%, var(--theme-border));
}

.result-panel--loss {
  border-color: color-mix(in srgb, var(--theme-danger) 65%, var(--theme-border));
}

.result-panel__kicker {
  color: var(--theme-accent);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.result-panel h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4vw, 2.2rem);
  line-height: 1.04;
  text-shadow: 0.1rem 0.16rem 0 rgba(0, 0, 0, 0.6);
}

.result-panel--win h2 {
  color: var(--theme-success);
}

.result-panel--loss h2 {
  color: var(--theme-danger);
}

.result-panel__word {
  margin: 0.2rem 0 0;
  color: var(--theme-text);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 4.4vw, 2.3rem);
  font-weight: 900;
  letter-spacing: 0.08em;
}

.result-panel__word--hidden {
  color: var(--theme-muted);
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-style: italic;
  letter-spacing: normal;
}

.result-panel__meta {
  margin: 0;
  color: var(--theme-muted);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.result-panel__definition {
  display: -webkit-box;
  max-width: 44rem;
  margin: 0.25rem auto 0;
  overflow: hidden;
  color: color-mix(in srgb, var(--theme-text) 84%, var(--theme-muted));
  font-size: clamp(0.78rem, 2.2vw, 1rem);
  font-style: italic;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.result-panel__actions {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 0.35rem;
}

@keyframes resultArrive {
  from {
    opacity: 0;
    transform: translateY(0.65rem) scale(0.97) rotate(-0.4deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0);
  }
}

@media (max-width: 480px) {
  .result-panel {
    gap: 0.36rem;
    padding: 0.7rem;
  }

  .result-panel__actions {
    gap: 0.42rem;
  }

  .result-panel__actions > * {
    flex: 1;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .result-panel {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.25rem 0.8rem;
    padding: 0.55rem 0.75rem;
    text-align: left;
  }

  .result-panel__kicker,
  .result-panel h2,
  .result-panel__word,
  .result-panel__meta,
  .result-panel__definition {
    grid-column: 1;
  }

  .result-panel h2 {
    font-size: 1.25rem;
  }

  .result-panel__word {
    font-size: 1.2rem;
  }

  .result-panel__definition {
    -webkit-line-clamp: 2;
  }

  .result-panel__actions {
    grid-column: 2;
    grid-row: 1 / 6;
    flex-direction: column;
    margin: 0;
  }
}
</style>
