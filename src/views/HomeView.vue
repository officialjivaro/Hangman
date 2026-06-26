<template>
  <div class="home-page" :style="pageStyle">
    <AppHeader />

    <main class="home-main">
      <!-- Theme Stage | Shows the selected original scene and theme catalog -->
      <section class="home-visual" aria-label="Visual theme selection">
        <div class="home-hero">
          <picture>
            <source
              :srcset="selectedTheme.mobileBackground"
              media="(max-width: 760px) and (orientation: portrait)"
            />
            <img :src="selectedTheme.desktopBackground" alt="" />
          </picture>
          <div class="home-hero__shade"></div>
          <div class="home-hero__copy">
            <span>Tonight's scene</span>
            <h2>{{ selectedTheme.name }}</h2>
            <p>{{ selectedTheme.description }}</p>
          </div>
        </div>

        <ThemePicker
          :themes="themeCatalog"
          :model-value="themeId"
          @update:model-value="selectTheme"
        />
      </section>

      <!-- Setup Panel | Chooses word rules and launches the game -->
      <section class="setup-panel" aria-labelledby="setup-title">
        <div class="setup-panel__heading">
          <span class="setup-panel__kicker">Set the trap</span>
          <h2 id="setup-title">Choose your challenge</h2>
          <p>Pick a word pack, tune the difficulty, then step into the scene.</p>
        </div>

        <div class="setup-panel__fields">
          <BaseSelect
            id="category-select"
            label="Category"
            :options="categoryOptions"
            :model-value="selectedCategory"
            :disabled="loadingCategories"
            @update:model-value="selectedCategory = $event"
          />

          <BaseSelect
            id="difficulty-select"
            label="Difficulty"
            :options="difficultyOptions"
            :model-value="selectedDifficulty"
            @update:model-value="selectedDifficulty = $event"
          />
        </div>

        <p v-if="categoryError" class="setup-panel__error" role="alert">
          {{ categoryError }}
        </p>

        <button
          class="advanced-toggle"
          type="button"
          :aria-expanded="advancedOpen"
          @click="advancedOpen = !advancedOpen"
        >
          <span>Advanced customization</span>
          <span aria-hidden="true">{{ advancedOpen ? '−' : '+' }}</span>
        </button>

        <div v-if="advancedOpen" class="advanced-panel">
          <div class="advanced-panel__heading">
            <div>
              <strong>Mix the scene pieces</strong>
              <span>The selected theme already provides matching defaults.</span>
            </div>
            <button type="button" aria-label="Close advanced customization" @click="advancedOpen = false">×</button>
          </div>

          <div class="advanced-panel__fields">
            <BaseSelect
              id="character-select"
              label="Hangman Dude"
              :options="characterOptions"
              :model-value="characterId"
              @update:model-value="setCharacter"
            />
            <BaseSelect
              id="frame-select"
              label="Hanging Frame"
              :options="frameOptions"
              :model-value="frameId"
              @update:model-value="setFrame"
            />
          </div>

          <BaseButton class="advanced-panel__done" variant="secondary" @click="advancedOpen = false">
            Done
          </BaseButton>
        </div>

        <div class="setup-panel__selection">
          <span>{{ selectedTheme.name }}</span>
          <span>{{ selectedCharacterName }}</span>
          <span>{{ selectedFrameName }}</span>
        </div>

        <BaseButton
          class="setup-panel__play"
          variant="primary"
          block
          :disabled="loadingCategories || Boolean(categoryError)"
          @click="playGame"
        >
          Play Hangman
        </BaseButton>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/layout/AppHeader.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseSelect from '../components/ui/BaseSelect.vue'
import ThemePicker from '../components/theme/ThemePicker.vue'
import { useVisualPreferences } from '../composables/useVisualPreferences.js'
import {
  characterCatalog,
  frameCatalog,
  getCharacterById,
  getFrameById,
  themeCatalog,
  themeToCssVariables
} from '../data/themeCatalog.js'

const router = useRouter()
const selectedCategory = ref('Random')
const selectedDifficulty = ref('Easy')
const categoryOptions = ref([{ value: 'Random', label: 'Random' }])
const loadingCategories = ref(true)
const categoryError = ref('')
const advancedOpen = ref(false)

const difficultyOptions = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' }
]

const characterOptions = characterCatalog.map(item => ({ value: item.id, label: item.name }))
const frameOptions = frameCatalog.map(item => ({ value: item.id, label: item.name }))

const {
  themeId,
  characterId,
  frameId,
  selectedTheme,
  routeQuery,
  setTheme,
  setCharacter,
  setFrame
} = useVisualPreferences()

const pageStyle = computed(() => themeToCssVariables(selectedTheme.value))
const selectedCharacterName = computed(() => getCharacterById(characterId.value).name)
const selectedFrameName = computed(() => getFrameById(frameId.value).name)

onMounted(loadCategories)

async function loadCategories() {
  loadingCategories.value = true
  categoryError.value = ''

  try {
    const response = await fetch('./data/words.json')

    if (!response.ok) {
      throw new Error(`Unable to load categories (${response.status}).`)
    }

    const data = await response.json()
    const categories = [...new Set(data.map(item => String(item.category || '').trim()).filter(Boolean))]
      .map(category => {
        const lower = category.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
      })
      .filter(category => category.toLowerCase() !== 'random')
      .sort((a, b) => a.localeCompare(b))

    categoryOptions.value = [
      { value: 'Random', label: 'Random' },
      ...categories.map(category => ({ value: category, label: category }))
    ]
  } catch (error) {
    categoryError.value = error instanceof Error ? error.message : 'Unable to load categories.'
  } finally {
    loadingCategories.value = false
  }
}

function selectTheme(nextThemeId) {
  setTheme(nextThemeId, true)
}

function playGame() {
  router.push({
    name: 'Game',
    query: {
      category: selectedCategory.value,
      difficulty: selectedDifficulty.value,
      ...routeQuery.value
    }
  })
}
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--theme-text);
  background: var(--theme-background);
  transition: background var(--transition-normal) ease, color var(--transition-normal) ease;
}

.home-main {
  display: grid;
  grid-template-columns: minmax(0, 1.42fr) minmax(19rem, 0.58fr);
  gap: clamp(0.75rem, 1.5vw, 1.35rem);
  width: 100%;
  height: calc(100% - var(--header-height));
  min-height: 0;
  padding: clamp(0.65rem, 1.5vw, 1.15rem);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 14%, color-mix(in srgb, var(--theme-accent-soft) 19%, transparent), transparent 34%),
    var(--theme-background);
}

.home-visual {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.8rem;
  min-width: 0;
  min-height: 0;
}

.home-hero {
  position: relative;
  min-height: 0;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: 1.6rem 1.05rem 1.35rem 0.95rem;
  box-shadow: var(--shadow-deep);
  isolation: isolate;
}

.home-hero picture,
.home-hero img,
.home-hero__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-hero img {
  object-fit: cover;
}

.home-hero__shade {
  background:
    linear-gradient(90deg, rgba(2, 3, 8, 0.74), rgba(2, 3, 8, 0.08) 67%),
    linear-gradient(0deg, rgba(2, 3, 8, 0.72), transparent 55%);
}

.home-hero__copy {
  position: absolute;
  z-index: 2;
  left: clamp(1rem, 3vw, 2.4rem);
  bottom: clamp(1rem, 3vw, 2.2rem);
  max-width: min(29rem, 68%);
}

.home-hero__copy > span,
.setup-panel__kicker {
  color: var(--theme-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.home-hero__copy h2 {
  margin: 0.18rem 0 0.4rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4.5vw, 4rem);
  line-height: 0.95;
  text-shadow: 0.13rem 0.18rem 0 rgba(0, 0, 0, 0.75);
  transform: rotate(-0.8deg);
}

.home-hero__copy p {
  margin: 0;
  color: color-mix(in srgb, var(--theme-text) 82%, var(--theme-muted));
  font-size: clamp(0.8rem, 1.5vw, 1.02rem);
  line-height: 1.35;
}

.setup-panel {
  position: relative;
  display: grid;
  align-content: center;
  gap: clamp(0.65rem, 1.4dvh, 1rem);
  min-width: 0;
  min-height: 0;
  padding: clamp(1rem, 2.1vw, 1.55rem);
  border: 1px solid var(--theme-border);
  border-radius: 1.05rem 1.55rem 0.9rem 1.25rem;
  color: var(--theme-text);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--theme-surface) 94%, transparent), var(--theme-surface-strong));
  box-shadow: var(--shadow-deep);
}

.setup-panel__heading h2 {
  margin: 0.12rem 0 0.35rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.6vw, 2.2rem);
  line-height: 1;
}

.setup-panel__heading p {
  margin: 0;
  color: var(--theme-muted);
  font-size: 0.82rem;
  line-height: 1.35;
}

.setup-panel__fields,
.advanced-panel__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.setup-panel__error {
  margin: 0;
  color: var(--theme-danger);
  font-size: 0.78rem;
}

.advanced-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.6rem;
  padding: 0.65rem 0.8rem;
  border: 1px dashed var(--theme-border);
  border-radius: var(--radius-medium);
  color: var(--theme-text);
  background: rgba(0, 0, 0, 0.18);
  font-weight: 800;
  cursor: pointer;
}

.advanced-panel {
  display: grid;
  gap: 0.75rem;
  padding: 0.8rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-medium);
  background: color-mix(in srgb, var(--theme-surface-strong) 90%, transparent);
  animation: advancedArrive 220ms ease both;
}

.advanced-panel__heading {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.advanced-panel__heading div {
  display: grid;
  gap: 0.2rem;
}

.advanced-panel__heading span {
  color: var(--theme-muted);
  font-size: 0.72rem;
}

.advanced-panel__heading button {
  display: none;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--theme-border);
  border-radius: 50%;
  color: var(--theme-text);
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.advanced-panel__done {
  display: none;
}

.setup-panel__selection {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.setup-panel__selection span {
  padding: 0.25rem 0.45rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-pill);
  color: var(--theme-muted);
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.64rem;
}

.setup-panel__play {
  margin-top: 0.15rem;
  font-size: 1.05rem;
}

@keyframes advancedArrive {
  from { opacity: 0; transform: translateY(-0.35rem); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .home-main {
    grid-template-columns: minmax(0, 1.12fr) minmax(17rem, 0.88fr);
  }

  .theme-card__copy span {
    display: none;
  }
}

@media (max-width: 700px) and (orientation: portrait) {
  .home-main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .home-visual {
    flex: 0 0 auto;
    display: block;
  }

  .home-hero {
    display: none;
  }

  .setup-panel {
    flex: 1;
    align-content: space-between;
    gap: clamp(0.38rem, 1.1dvh, 0.7rem);
    padding: 0.72rem;
  }

  .setup-panel__heading p {
    display: none;
  }

  .setup-panel__fields {
    gap: 0.5rem;
  }

  .setup-panel__selection {
    display: none;
  }

  .advanced-panel {
    position: fixed;
    z-index: 60;
    inset:
      calc(var(--header-height) + 0.55rem)
      max(0.55rem, env(safe-area-inset-right))
      max(0.55rem, env(safe-area-inset-bottom))
      max(0.55rem, env(safe-area-inset-left));
    align-content: center;
    padding: 1rem;
    border-radius: 1.1rem;
    background: var(--theme-surface-strong);
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.65), var(--shadow-deep);
  }

  .advanced-panel__heading button,
  .advanced-panel__done {
    display: block;
  }
}

@media (max-width: 390px) {
  .setup-panel__fields {
    grid-template-columns: 1fr;
  }

  .setup-panel__heading h2 {
    font-size: 1.15rem;
  }
}

@media (max-height: 560px) and (orientation: landscape) {
  .home-main {
    grid-template-columns: minmax(0, 1.25fr) minmax(17rem, 0.75fr);
    gap: 0.55rem;
    padding: 0.45rem;
  }

  .home-hero {
    display: none;
  }

  .home-visual {
    display: flex;
    align-items: center;
  }

  .setup-panel {
    gap: 0.42rem;
    padding: 0.6rem;
  }

  .setup-panel__heading p,
  .setup-panel__selection {
    display: none;
  }

  .advanced-panel {
    position: absolute;
    z-index: 30;
    inset: 0.5rem;
    align-content: center;
    background: var(--theme-surface-strong);
  }

  .advanced-panel__heading button,
  .advanced-panel__done {
    display: block;
  }
}
</style>
