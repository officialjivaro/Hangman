<template>
  <div class="game-view">
    <Banner />
    <div class="game-area">
      <HangmanFigure :wrongGuesses="wrongCount" />

      <LetterButtons
        :guessedLetters="guessedLetters"
        @guess="handleGuess"
        v-if="wrongCount < 6 && !gameWon"
      />

      <br />

      <div class="switch-toggle reveal-switch">
        <span>Reveal on Fail?</span>
        <label class="switch">
          <input type="checkbox" v-model="revealOnFail" />
          <span class="slider"></span>
        </label>
      </div>

      <button class="return-btn midgame-return" @click="goHome">
        Return to Main
      </button>

      <div class="word-display">
        <span v-for="(char, index) in displayWord" :key="index">
          {{ char }}
        </span>
      </div>

      <div class="game-over" v-if="wrongCount >= 6">
        <div class="game-over-text">Game Over</div>
        <div v-if="revealOnFail" class="reveal-fail">
          The word was: {{ chosenWord }}
        </div>
      </div>

      <div class="game-win" v-if="gameWon">
        <div class="game-win-text">You Win!</div>
        <div v-if="chosenObject?.definition" class="definition-text">
          {{ chosenObject.definition }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Banner from './Banner.vue'
import HangmanFigure from './HangmanFigure.vue'
import LetterButtons from './LetterButtons.vue'

const route = useRoute()
const router = useRouter()

const category = ref(route.query.category || 'random')
const difficulty = ref(route.query.difficulty || 'Easy')
const words = ref([])
const chosenObject = ref(null)
const chosenWord = ref('')
const displayWord = ref([])
const guessedLetters = ref([])
const wrongCount = ref(0)
const gameWon = ref(false)
const revealOnFail = ref(false)

onMounted(async () => {
  const response = await fetch('./data/words.json')
  words.value = await response.json()
  filterAndChooseWord()
  updateDisplayWord()
})

function filterAndChooseWord() {
  let filtered = words.value

  if (category.value.toLowerCase() !== 'random') {
    filtered = filtered.filter(
      w => w.category.toLowerCase() === category.value.toLowerCase()
    )
  }

  filtered = filtered.filter(
    w => w.difficulty.toLowerCase() === difficulty.value.toLowerCase()
  )

  if (!filtered.length) {
    filtered = words.value
  }

  const randIndex = Math.floor(Math.random() * filtered.length)
  chosenObject.value = filtered[randIndex]
  chosenWord.value = chosenObject.value.word.toUpperCase()
}

function updateDisplayWord() {
  displayWord.value = chosenWord.value
    .split('')
    .map(letter => (guessedLetters.value.includes(letter) ? letter : '_'))
}

function handleGuess(letter) {
  guessedLetters.value.push(letter)
  if (chosenWord.value.includes(letter)) {
    updateDisplayWord()
    if (!displayWord.value.includes('_')) {
      gameWon.value = true
    }
  } else {
    wrongCount.value += 1
  }
}

function goHome() {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

.game-area {
  margin-top: 2vh;
  text-align: center;
}

.midgame-return {
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.word-display {
  margin-top: 2vh;
  font-size: 3vh;
  letter-spacing: 1vw;
}

.game-over,
.game-win {
  margin-top: 2vh;
}

.game-over-text {
  color: red;
  text-shadow: 0.5vh 0.5vh 0.5vh rgba(0,0,0,0.4);
  font-size: 4vh;
  font-weight: bold;
  margin-bottom: 2vh;
}

.game-win-text {
  color: green;
  text-shadow: 0.5vh 0.5vh 0.5vh rgba(0,0,0,0.4);
  font-size: 4vh;
  font-weight: bold;
  margin-bottom: 2vh;
}

.definition-text {
  margin-bottom: 1rem;
  font-style: italic;
  color: #555;
  font-size: 2.5vh;
}

.return-btn {
  padding: 1vh 2vw;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2vh;
}

.switch-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  justify-content: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  transition: 0.2s;
  border-radius: 1.25rem;
  border: 1px solid #222;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1rem;
  width: 1rem;
  left: 0.13rem;
  bottom: 0.13rem;
  background-color: white;
  transition: 0.2s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: #66bb6a;
}

.switch input:checked + .slider:before {
  transform: translateX(1.2rem);
}
</style>
