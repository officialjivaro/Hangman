import { computed, ref, watch } from 'vue'
import {
  characterCatalog,
  defaultCharacterId,
  defaultFrameId,
  defaultThemeId,
  frameCatalog,
  getThemeById,
  themeCatalog
} from '../data/themeCatalog.js'

const STORAGE_KEY = 'hangman.visual-preferences.v1'

function queryValue(value) {
  if (Array.isArray(value)) {
    return value[0] || ''
  }

  return typeof value === 'string' ? value : ''
}

function hasId(items, id) {
  return items.some(item => item.id === id)
}

function readSavedPreferences() {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Visual Preferences | Validates route and saved theme selections
export function useVisualPreferences(initial = {}) {
  const saved = readSavedPreferences()
  const requestedTheme = queryValue(initial.theme)
  const safeTheme = hasId(themeCatalog, requestedTheme)
    ? requestedTheme
    : hasId(themeCatalog, saved.themeId)
      ? saved.themeId
      : defaultThemeId

  const theme = getThemeById(safeTheme)
  const requestedCharacter = queryValue(initial.character)
  const requestedFrame = queryValue(initial.frame)

  const themeId = ref(safeTheme)
  const characterId = ref(
    hasId(characterCatalog, requestedCharacter)
      ? requestedCharacter
      : hasId(characterCatalog, saved.characterId)
        ? saved.characterId
        : theme.defaultCharacterId || defaultCharacterId
  )
  const frameId = ref(
    hasId(frameCatalog, requestedFrame)
      ? requestedFrame
      : hasId(frameCatalog, saved.frameId)
        ? saved.frameId
        : theme.defaultFrameId || defaultFrameId
  )

  const selectedTheme = computed(() => getThemeById(themeId.value))

  const routeQuery = computed(() => ({
    theme: themeId.value,
    character: characterId.value,
    frame: frameId.value
  }))

  function setTheme(nextThemeId, applyDefaults = true) {
    if (!hasId(themeCatalog, nextThemeId)) {
      return
    }

    themeId.value = nextThemeId

    if (applyDefaults) {
      const nextTheme = getThemeById(nextThemeId)
      characterId.value = nextTheme.defaultCharacterId
      frameId.value = nextTheme.defaultFrameId
    }
  }

  function setCharacter(nextCharacterId) {
    if (hasId(characterCatalog, nextCharacterId)) {
      characterId.value = nextCharacterId
    }
  }

  function setFrame(nextFrameId) {
    if (hasId(frameCatalog, nextFrameId)) {
      frameId.value = nextFrameId
    }
  }

  watch(
    [themeId, characterId, frameId],
    ([nextTheme, nextCharacter, nextFrame]) => {
      if (typeof window === 'undefined') {
        return
      }

      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            themeId: nextTheme,
            characterId: nextCharacter,
            frameId: nextFrame
          })
        )
      } catch {
        // Storage is optional; the app still works when it is unavailable.
      }
    },
    { immediate: true }
  )

  return {
    themeId,
    characterId,
    frameId,
    selectedTheme,
    routeQuery,
    setTheme,
    setCharacter,
    setFrame
  }
}
