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
      <button class="return-btn midgame-return" @click="goHome">Return to Title</button>
      <div class="word-display">
        <span v-for="(char, index) in displayWord" :key="index">
          {{ char }}
        </span>
      </div>
      <div class="game-over" v-if="wrongCount >= 6">
        <div class="game-over-text">Game Over</div>
        <button class="return-btn" @click="goHome">Return to Main</button>
      </div>
      <div class="game-win" v-if="gameWon">
        <div class="game-win-text">You Win!</div>
        <button class="return-btn" @click="goHome">Return to Main</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banner from '../components/Banner.vue'
import HangmanFigure from '../components/HangmanFigure.vue'
import LetterButtons from '../components/LetterButtons.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const category = ref(route.query.category || 'random')
const difficulty = ref(route.query.difficulty || 'Easy')
const words = ref([])
const chosenWord = ref('')
const displayWord = ref([])
const guessedLetters = ref([])
const wrongCount = ref(0)
const gameWon = ref(false)

onMounted(async () => {
  const response = await fetch('./data/words.json')
  words.value = await response.json()
  filterAndChooseWord()
  updateDisplayWord()
})

function filterAndChooseWord() {
  let filtered = words.value
  if (category.value !== 'random') {
    filtered = filtered.filter(w => w.category === category.value)
  }
  filtered = filtered.filter(w => w.difficulty === difficulty.value)
  if (!filtered.length) {
    filtered = words.value
  }
  const randIndex = Math.floor(Math.random() * filtered.length)
  chosenWord.value = filtered[randIndex].word.toUpperCase()
}

function updateDisplayWord() {
  displayWord.value = chosenWord.value.split('').map(letter => 
    guessedLetters.value.includes(letter) ? letter : '_'
  )
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
.game-over, .game-win {
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
.return-btn {
  padding: 1vh 2vw;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2vh;
}
</style>
