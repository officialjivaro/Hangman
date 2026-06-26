<template>
  <section class="game-hud" aria-label="Round information and controls">
    <div class="game-hud__meta">
      <span class="game-hud__tag">{{ category }}</span>
      <span class="game-hud__tag">{{ difficulty }}</span>
    </div>

    <div class="game-hud__attempts" :aria-label="`${remainingMistakes} mistakes remaining`">
      <span class="game-hud__attempt-label">Mistakes left</span>
      <span class="game-hud__attempt-dots" aria-hidden="true">
        <i
          v-for="index in maxWrongGuesses"
          :key="index"
          :class="{ used: index > remainingMistakes }"
        ></i>
      </span>
      <strong>{{ remainingMistakes }}</strong>
    </div>

    <ToggleSwitch
      class="game-hud__toggle"
      label="Reveal on fail"
      description="Show the answer after a loss"
      :model-value="revealOnFail"
      :disabled="disabled"
      @update:model-value="$emit('update:revealOnFail', $event)"
    />

    <BaseButton class="game-hud__home" variant="quiet" @click="$emit('home')">
      Return to Main
    </BaseButton>
  </section>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue'
import ToggleSwitch from '../ui/ToggleSwitch.vue'

defineProps({
  category: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    default: ''
  },
  remainingMistakes: {
    type: Number,
    default: 0
  },
  maxWrongGuesses: {
    type: Number,
    default: 6
  },
  revealOnFail: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:revealOnFail', 'home'])
</script>

<style scoped>
.game-hud {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem 0.85rem;
  padding: 0.8rem;
  border: 1px solid var(--theme-border);
  border-radius: 1rem 0.8rem 1.1rem 0.75rem;
  color: var(--theme-text);
  background: var(--theme-surface);
  box-shadow: var(--shadow-small);
}

.game-hud__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.game-hud__tag {
  padding: 0.28rem 0.5rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-pill);
  color: var(--theme-muted);
  background: rgba(0, 0, 0, 0.22);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.game-hud__attempts {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;
  min-width: 0;
}

.game-hud__attempt-label {
  color: var(--theme-muted);
  font-size: 0.7rem;
  font-weight: 800;
}

.game-hud__attempt-dots {
  display: flex;
  gap: 0.2rem;
}

.game-hud__attempt-dots i {
  width: 0.45rem;
  height: 0.45rem;
  border: 1px solid var(--theme-border);
  border-radius: 50%;
  background: var(--theme-accent);
  box-shadow: 0 0 0.35rem color-mix(in srgb, var(--theme-accent) 38%, transparent);
}

.game-hud__attempt-dots i.used {
  background: rgba(0, 0, 0, 0.35);
  box-shadow: none;
  opacity: 0.52;
}

.game-hud__attempts strong {
  min-width: 1.2rem;
  color: var(--theme-accent);
  font-family: var(--font-display);
  font-size: 1.25rem;
  text-align: center;
}

.game-hud__toggle {
  align-self: center;
}

.game-hud__home {
  align-self: center;
  justify-self: end;
}

@media (max-width: 760px) {
  .game-hud {
    grid-template-columns: 1fr auto;
    padding: 0.58rem 0.68rem;
  }

  .game-hud__toggle {
    grid-column: 1 / -1;
  }

  .game-hud__home {
    grid-column: 2;
    grid-row: 1;
    min-height: 2.2rem;
    padding: 0.42rem 0.7rem;
    font-size: 0.78rem;
  }

  .game-hud__attempts {
    grid-column: 1 / -1;
    justify-content: space-between;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .game-hud {
    grid-template-columns: auto 1fr auto;
    gap: 0.45rem;
    padding: 0.46rem 0.58rem;
  }

  .game-hud__attempts {
    grid-column: auto;
    justify-content: center;
  }

  .game-hud__toggle {
    display: none;
  }

  .game-hud__home {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
