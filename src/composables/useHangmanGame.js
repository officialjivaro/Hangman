import { computed, ref, unref } from 'vue'

function normalizeSelection(value, fallback) {
  const resolved = unref(value)

  if (Array.isArray(resolved)) {
    return resolved[0] || fallback
  }

  return resolved || fallback
}

function titleCase(value) {
  const text = String(value || '').toLowerCase()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : ''
}

// Hangman Game | Owns word loading, guesses, and round state
export function useHangmanGame(options = {}) {
  const maxWrongGuesses = options.maxWrongGuesses || 6
  const words = ref([])
  const loading = ref(false)
  const loadError = ref('')
  const chosenObject = ref(null)
  const chosenWord = ref('')
  const displayWord = ref([])
  const guessedLetters = ref([])
  const wrongCount = ref(0)
  const revealOnFail = ref(false)
  const announcement = ref('')

  const correctLetters = computed(() => {
    return guessedLetters.value.filter(letter => chosenWord.value.includes(letter))
  })

  const wrongLetters = computed(() => {
    return guessedLetters.value.filter(letter => !chosenWord.value.includes(letter))
  })

  const gameWon = computed(() => {
    return Boolean(chosenWord.value) && !displayWord.value.includes('_')
  })

  const gameLost = computed(() => wrongCount.value >= maxWrongGuesses)
  const roundFinished = computed(() => gameWon.value || gameLost.value)
  const remainingMistakes = computed(() => Math.max(0, maxWrongGuesses - wrongCount.value))
  const displayCategory = computed(() => titleCase(chosenObject.value?.category || options.category))
  const displayDifficulty = computed(() => titleCase(chosenObject.value?.difficulty || options.difficulty))

  async function loadWords() {
    if (words.value.length) {
      return true
    }

    loading.value = true
    loadError.value = ''

    try {
      const response = await fetch('./data/words.json')

      if (!response.ok) {
        throw new Error(`Unable to load words (${response.status}).`)
      }

      const data = await response.json()

      if (!Array.isArray(data) || !data.length) {
        throw new Error('The word list is empty or invalid.')
      }

      words.value = data.filter(item => item && item.word && item.category && item.difficulty)
      return Boolean(words.value.length)
    } catch (error) {
      loadError.value = error instanceof Error ? error.message : 'Unable to load the word list.'
      return false
    } finally {
      loading.value = false
    }
  }

  function getFilteredWords() {
    const selectedCategory = String(normalizeSelection(options.category, 'random')).toLowerCase()
    const selectedDifficulty = String(normalizeSelection(options.difficulty, 'Easy')).toLowerCase()

    let filtered = words.value

    if (selectedCategory !== 'random') {
      filtered = filtered.filter(item => {
        return String(item.category).toLowerCase() === selectedCategory
      })
    }

    filtered = filtered.filter(item => {
      return String(item.difficulty).toLowerCase() === selectedDifficulty
    })

    if (filtered.length) {
      return filtered
    }

    const difficultyFallback = words.value.filter(item => {
      return String(item.difficulty).toLowerCase() === selectedDifficulty
    })

    return difficultyFallback.length ? difficultyFallback : words.value
  }

  function updateDisplayWord() {
    displayWord.value = chosenWord.value.split('').map(character => {
      if (!/[A-Z]/.test(character)) {
        return character
      }

      return guessedLetters.value.includes(character) ? character : '_'
    })
  }

  async function startNewWord() {
    const ready = await loadWords()

    if (!ready) {
      return
    }

    const filtered = getFilteredWords()
    let pool = filtered

    if (filtered.length > 1 && chosenObject.value) {
      const withoutPrevious = filtered.filter(item => {
        return !(
          item.word === chosenObject.value.word &&
          item.category === chosenObject.value.category &&
          item.difficulty === chosenObject.value.difficulty
        )
      })

      if (withoutPrevious.length) {
        pool = withoutPrevious
      }
    }

    const next = pool[Math.floor(Math.random() * pool.length)]
    chosenObject.value = next
    chosenWord.value = String(next.word).toUpperCase()
    guessedLetters.value = []
    wrongCount.value = 0
    revealOnFail.value = false
    announcement.value = `New ${displayDifficulty.value.toLowerCase()} word loaded.`
    updateDisplayWord()
  }

  function handleGuess(letter) {
    const normalizedLetter = String(letter || '').toUpperCase()

    if (!/^[A-Z]$/.test(normalizedLetter)) {
      return
    }

    if (roundFinished.value || guessedLetters.value.includes(normalizedLetter)) {
      return
    }

    guessedLetters.value.push(normalizedLetter)

    if (chosenWord.value.includes(normalizedLetter)) {
      updateDisplayWord()
      announcement.value = `${normalizedLetter} is in the word.`

      if (gameWon.value) {
        announcement.value = `You won. The word was ${chosenWord.value}.`
      }
    } else {
      wrongCount.value += 1
      announcement.value = `${normalizedLetter} is not in the word. ${remainingMistakes.value} mistakes remain.`

      if (gameLost.value) {
        announcement.value = revealOnFail.value
          ? `Game over. The word was ${chosenWord.value}.`
          : 'Game over.'
      }
    }
  }

  function handleKeyboardEvent(event) {
    const target = event.target
    const tagName = target?.tagName?.toLowerCase()

    if (['input', 'select', 'textarea'].includes(tagName) || target?.isContentEditable) {
      return
    }

    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return
    }

    if (/^[a-z]$/i.test(event.key)) {
      event.preventDefault()
      handleGuess(event.key)
    }
  }

  return {
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
    gameLost,
    roundFinished,
    remainingMistakes,
    displayCategory,
    displayDifficulty,
    loadWords,
    startNewWord,
    handleGuess,
    handleKeyboardEvent
  }
}
