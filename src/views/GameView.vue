<template>
  <div class="game-page" :style="pageStyle">
    <AppHeader />

    <main class="game-layout">
      <div class="game-layout__scene">
        <GameScene
          :theme="selectedTheme"
          :character-id="characterId"
          :frame-id="frameId"
          :wrong-guesses="wrongCount"
        />
      </div>

      <section class="game-layout__panel" aria-label="Hangman controls">
        <GameHud
          :category="displayCategory"
          :difficulty="displayDifficulty"
          :remaining-mistakes="remainingMistakes"
          :max-wrong-guesses="maxWrongGuesses"
          :reveal-on-fail="revealOnFail"
          :disabled="roundFinished"
          @update:reveal-on-fail="revealOnFail = $event"
          @home="goHome"
        />

        <WordDisplay :characters="displayWord" />

        <div class="game-layout__action-area">
          <div v-if="loading" class="game-message" role="status">
            <span class="game-message__moon" aria-hidden="true"></span>
            Loading a suitably troublesome word…
          </div>

          <div v-else-if="loadError" class="game-message game-message--error" role="alert">
            <strong>The word crypt would not open.</strong>
            <span>{{ loadError }}</span>
            <BaseButton variant="secondary" @click="startNewWord">Try Again</BaseButton>
          </div>

          <GameKeyboard
            v-else-if="!roundFinished"
            :guessed-letters="guessedLetters"
            :correct-letters="correctLetters"
            :wrong-letters="wrongLetters"
            @guess="handleGuess"
          />

          <ResultPanel
            v-else
            :game-won="gameWon"
            :word="chosenWord"
            :reveal-on-fail="revealOnFail"
            :category="displayCategory"
            :difficulty="displayDifficulty"
            :definition="chosenObject?.definition || ''"
            @new-word="startNewWord"
            @home="goHome"
          />
        </div>
      </section>
    </main>

    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ announcement }}</p>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/layout/AppHeader.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import GameScene from '../components/scene/GameScene.vue'
import GameHud from '../components/game/GameHud.vue'
import GameKeyboard from '../components/game/GameKeyboard.vue'
import ResultPanel from '../components/game/ResultPanel.vue'
import WordDisplay from '../components/game/WordDisplay.vue'
import { useHangmanGame } from '../composables/useHangmanGame.js'
import { useVisualPreferences } from '../composables/useVisualPreferences.js'
import { themeToCssVariables } from '../data/themeCatalog.js'

const route = useRoute()
const router = useRouter()
const category = queryValue(route.query.category, 'Random')
const difficulty = queryValue(route.query.difficulty, 'Easy')

const {
  characterId,
  frameId,
  selectedTheme
} = useVisualPreferences({
  theme: route.query.theme,
  character: route.query.character,
  frame: route.query.frame
})

const {
  maxWrongGuesses,
  loading,
  loadError,
  chosenObject,
  chosenWord,
  displayWord,
  guessedLetters,
  wrongCount,
  revealOnFail,
  announcement,
  correctLetters,
  wrongLetters,
  gameWon,
  roundFinished,
  remainingMistakes,
  displayCategory,
  displayDifficulty,
  startNewWord,
  handleGuess,
  handleKeyboardEvent
} = useHangmanGame({ category, difficulty, maxWrongGuesses: 6 })

const pageStyle = computed(() => themeToCssVariables(selectedTheme.value))

onMounted(() => {
  startNewWord()
  window.addEventListener('keydown', handleKeyboardEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})

function queryValue(value, fallback) {
  if (Array.isArray(value)) {
    return value[0] || fallback
  }

  return typeof value === 'string' && value ? value : fallback
}

function goHome() {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.game-page {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--theme-text);
  background:
    radial-gradient(circle at 85% 10%, color-mix(in srgb, var(--theme-accent-soft) 17%, transparent), transparent 34%),
    var(--theme-background);
  transition: background var(--transition-normal) ease, color var(--transition-normal) ease;
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(22rem, 0.7fr);
  gap: clamp(0.65rem, 1.4vw, 1.1rem);
  width: 100%;
  height: calc(100% - var(--header-height));
  min-height: 0;
  padding: clamp(0.55rem, 1.35vw, 1rem);
  overflow: hidden;
}

.game-layout__scene,
.game-layout__panel,
.game-layout__action-area {
  min-width: 0;
  min-height: 0;
}

.game-layout__panel {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  gap: clamp(0.5rem, 1.2dvh, 0.85rem);
}

.game-layout__action-area {
  display: grid;
  align-items: center;
  overflow: hidden;
}

.game-message {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 0.65rem;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-large);
  color: var(--theme-muted);
  background: var(--theme-surface);
  text-align: center;
}

.game-message--error strong {
  color: var(--theme-danger);
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.game-message__moon {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: var(--theme-accent);
  box-shadow: 0 0 1rem color-mix(in srgb, var(--theme-accent) 55%, transparent);
  animation: loadingMoon 1.2s ease-in-out infinite alternate;
}

@keyframes loadingMoon {
  from { transform: translateY(-0.25rem) scale(0.94); opacity: 0.72; }
  to { transform: translateY(0.2rem) scale(1.04); opacity: 1; }
}

@media (max-width: 900px) and (min-width: 761px) {
  .game-layout {
    grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.92fr);
  }
}

@media (max-width: 760px) and (orientation: portrait) {
  .game-layout {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 41%) minmax(0, 59%);
    gap: 0.45rem;
    padding: 0.45rem;
  }

  .game-layout__panel {
    grid-template-rows: auto auto minmax(0, 1fr);
    gap: 0.38rem;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .game-layout {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 0.4rem;
    padding: 0.35rem;
  }

  .game-layout__panel {
    gap: 0.3rem;
  }
}
</style>
