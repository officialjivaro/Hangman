<template>
  <section class="theme-picker" aria-labelledby="theme-picker-title">
    <div class="theme-picker__heading">
      <div>
        <span class="theme-picker__kicker">Scene collection</span>
        <h2 id="theme-picker-title">Choose tonight's nightmare</h2>
      </div>
      <span class="theme-picker__count">{{ currentIndex + 1 }} / {{ themes.length }}</span>
    </div>

    <div class="theme-picker__cards">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        :class="{
          'theme-card--selected': theme.id === modelValue,
          'theme-card--mobile-hidden': theme.id !== modelValue
        }"
        type="button"
        :aria-pressed="theme.id === modelValue"
        @click="selectTheme(theme.id)"
      >
        <span class="theme-card__image-wrap">
          <img
            class="theme-card__image"
            :src="theme.preview"
            :alt="`${theme.name} visual theme preview`"
          />
          <span class="theme-card__badge">
            {{ theme.priceType === 'free' ? 'Free' : 'Locked' }}
          </span>
        </span>
        <span class="theme-card__copy">
          <strong>{{ theme.name }}</strong>
          <span>{{ theme.description }}</span>
        </span>
        <span class="theme-card__check" aria-hidden="true">
          {{ theme.id === modelValue ? '✓' : '○' }}
        </span>
      </button>
    </div>

    <div class="theme-picker__mobile-nav" aria-label="Theme navigation">
      <button type="button" aria-label="Previous theme" @click="selectRelative(-1)">‹</button>
      <div class="theme-picker__dots" aria-hidden="true">
        <span
          v-for="theme in themes"
          :key="theme.id"
          :class="{ active: theme.id === modelValue }"
        ></span>
      </div>
      <button type="button" aria-label="Next theme" @click="selectRelative(1)">›</button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  themes: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const currentIndex = computed(() => {
  const index = props.themes.findIndex(theme => theme.id === props.modelValue)
  return index >= 0 ? index : 0
})

function selectTheme(themeId) {
  emit('update:modelValue', themeId)
}

function selectRelative(direction) {
  if (!props.themes.length) {
    return
  }

  const nextIndex = (currentIndex.value + direction + props.themes.length) % props.themes.length
  emit('update:modelValue', props.themes[nextIndex].id)
}
</script>

<style scoped>
.theme-picker {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
}

.theme-picker__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.theme-picker__kicker {
  color: var(--theme-accent);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.theme-picker h2 {
  margin: 0.08rem 0 0;
  color: var(--theme-text);
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.1vw, 1.55rem);
  font-weight: 700;
}

.theme-picker__count {
  color: var(--theme-muted);
  font-size: 0.78rem;
  font-weight: 900;
}

.theme-picker__cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.theme-card {
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-width: 0;
  min-height: 10.5rem;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: 0.85rem 1.15rem 0.78rem 1.05rem;
  color: var(--theme-text);
  background: var(--theme-surface);
  box-shadow: var(--shadow-small);
  cursor: pointer;
  text-align: left;
  transition:
    transform var(--transition-normal) ease,
    border-color var(--transition-normal) ease,
    box-shadow var(--transition-normal) ease;
}

.theme-card:hover,
.theme-card--selected {
  transform: translateY(-0.18rem) rotate(-0.2deg);
  border-color: color-mix(in srgb, var(--theme-accent) 72%, white);
  box-shadow: var(--shadow-medium);
}

.theme-card--selected {
  outline: 1px solid color-mix(in srgb, var(--theme-accent) 55%, transparent);
  outline-offset: 2px;
}

.theme-card__image-wrap {
  position: relative;
  min-height: 6.4rem;
  overflow: hidden;
}

.theme-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.theme-card:hover .theme-card__image,
.theme-card--selected .theme-card__image {
  transform: scale(1.04);
}

.theme-card__image-wrap::after {
  position: absolute;
  inset: auto 0 0;
  height: 48%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  content: '';
}

.theme-card__badge {
  position: absolute;
  z-index: 2;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.24rem 0.48rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-pill);
  color: var(--color-bone);
  background: rgba(5, 5, 10, 0.68);
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.theme-card__copy {
  display: grid;
  gap: 0.18rem;
  padding: 0.68rem 0.78rem 0.78rem;
}

.theme-card__copy strong {
  font-family: var(--font-display);
  font-size: 0.95rem;
}

.theme-card__copy span {
  display: -webkit-box;
  overflow: hidden;
  color: var(--theme-muted);
  font-size: 0.7rem;
  line-height: 1.25;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.theme-card__check {
  position: absolute;
  right: 0.6rem;
  bottom: 0.52rem;
  color: var(--theme-accent);
  font-weight: 900;
}

.theme-picker__mobile-nav {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
}

.theme-picker__mobile-nav button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--theme-border);
  border-radius: 50%;
  color: var(--theme-text);
  background: var(--theme-surface);
  font-size: 1.45rem;
  cursor: pointer;
}

.theme-picker__dots {
  display: flex;
  gap: 0.4rem;
}

.theme-picker__dots span {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--theme-muted);
  opacity: 0.42;
}

.theme-picker__dots span.active {
  background: var(--theme-accent);
  opacity: 1;
}

@media (max-width: 700px) {
  .theme-picker__cards {
    display: block;
  }

  .theme-card {
    min-height: clamp(8.4rem, 24dvh, 11.5rem);
  }

  .theme-card--mobile-hidden {
    display: none;
  }

  .theme-picker__mobile-nav {
    display: flex;
  }

  .theme-card__copy span {
    -webkit-line-clamp: 1;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .theme-card {
    min-height: 7.2rem;
  }

  .theme-card__image-wrap {
    min-height: 4.4rem;
  }

  .theme-card__copy {
    padding: 0.42rem 0.55rem 0.5rem;
  }

  .theme-card__copy span {
    display: none;
  }
}
</style>
