<template>
  <div class="home-view">
    <Banner />
    <h2 class="tagline">Welcome to the Ultimate Hangman Challenge</h2>
    <img
      :src="heroImage"
      alt="Hero"
      class="hero-image"
    />
    <div class="selectors-line">
      <div class="dropdown-group">
        <label class="label-styled">Category:</label>
        <CategorySelector
          :categories="categories"
          @update:category="selectedCategory = $event"
        />
      </div>
      <div class="dropdown-group">
        <label class="label-styled">Difficulty:</label>
        <DifficultySelector
          :difficulties="difficulties"
          @update:difficulty="selectedDifficulty = $event"
        />
      </div>
    </div>
    <button class="play-button" @click="playGame">Play</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from '../components/Banner.vue'
import CategorySelector from '../components/CategorySelector.vue'
import DifficultySelector from '../components/DifficultySelector.vue'
import { useRouter } from 'vue-router'
import heroImage from '../assets/images/hero_image.png'

const router = useRouter()

const categories = ref(['Animals','Technology','Movies'])
const difficulties = ref(['Easy','Medium','Hard'])
const selectedCategory = ref('random')
const selectedDifficulty = ref('Easy')

function playGame() {
  router.push({
    name: 'Game',
    query: {
      category: selectedCategory.value,
      difficulty: selectedDifficulty.value
    }
  })
}
</script>

<style scoped>
/* This view stretches to fill leftover vertical space (flex: 1) 
   so the entire container can resize fluidly. */
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

/* Tagline uses a small fraction of vertical space */
.tagline {
  margin-top: 1vh;
  text-align: center;
  font-size: 2.5vh;
  color: #444;
  text-shadow: 1px 1px 2px #999;
  font-weight: bold;
}

/* The hero image is sized in viewport widths/heights so it 
   adjusts fluidly. */
.hero-image {
  margin: 2vh 0;
  width: 40vw;
  max-width: 700px;
  height: auto;
  max-height: 50vh;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* This line for the selectors is flexible and auto-shrinks if needed. */
.selectors-line {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  margin: 2vh 0;
}

.dropdown-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5vh;
}

.label-styled {
  font-weight: bold;
  margin-right: 8px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  font-size: 2vh;
}

/* The play button uses flexible units so it scales up/down
   with the viewport. */
.play-button {
  padding: 2vh 4vw;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 0.6vh #333;
  transition: all 0.2s ease;
  margin-bottom: 3vh;
  font-size: 2vh;
}

.play-button:hover {
  transform: translateY(-0.3vh);
  box-shadow: 0 0.8vh #333;
}
</style>
