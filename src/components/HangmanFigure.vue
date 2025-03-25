<template>
  <div class="hangman-figure">
    <div class="post"></div>
    <div class="gallow"></div>
    <div class="rope" :class="{ 'animate-rope': wrongGuesses > 0 }">
      <div class="head" v-if="wrongGuesses > 0" :class="{ 'animate-head': wrongGuesses > 0 }">
        <div class="body" v-if="wrongGuesses > 1" :class="{ 'animate-body': wrongGuesses > 1 }">
          <div class="arms" v-if="wrongGuesses > 2">
            <div class="arm left" :class="{ 'animate-arm-left': wrongGuesses > 2 }"></div>
            <div class="arm right" v-if="wrongGuesses > 3" :class="{ 'animate-arm-right': wrongGuesses > 3 }"></div>
          </div>
          <div class="legs" v-if="wrongGuesses > 4">
            <div class="leg left" :class="{ 'animate-leg-left': wrongGuesses > 4 }"></div>
            <div class="leg right" v-if="wrongGuesses > 5" :class="{ 'animate-leg-right': wrongGuesses > 5 }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  wrongGuesses: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.hangman-figure {
  width: 200px;
  height: 300px;
  position: relative;
  margin: 20px auto;
}
.post {
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 100%;
  background: #333;
}
.gallow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: #333;
}
.rope {
  position: absolute;
  top: 10px;
  left: 99px;
  width: 2px;
  height: 20px;
  background: #333;
}
.animate-rope {
  animation: ropeSway 3s infinite ease-in-out alternate;
}
.head {
  position: absolute;
  top: 20px;
  left: -19px;
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 50%;
}
.animate-head {
  animation: headSway 4s infinite ease-in-out alternate;
}
.body {
  position: absolute;
  top: 40px;
  left: 19px;
  width: 2px;
  height: 50px;
  background: #333;
  transform-origin: top center;
}
.animate-body {
  animation: bodySway 3.5s infinite ease-in-out alternate;
}
.arms {
  position: absolute;
  top: 10px;
  left: -3px;
  width: 40px;
  height: 40px;
}
.arm {
  width: 2px;
  height: 30px;
  background: #333;
  position: absolute;
  transform-origin: top center;
}
.arm.left {
  top: 0;
  left: 0;
  transform: rotate(90deg);
}
.arm.right {
  top: 0;
  left: 5.5px;
  transform: rotate(90deg);
}
.animate-arm-left {
  animation: armLeftSway 3s infinite ease-in-out alternate;
}
.animate-arm-right {
  animation: armRightSway 3.2s infinite ease-in-out alternate;
}
.legs {
  position: absolute;
  top: 50px;
  left: -1px;
  width: 4px;
  height: 40px;
}
.leg {
  width: 2px;
  height: 30px;
  background: #333;
  position: absolute;
  transform-origin: top center;
}
.leg.left {
  left: -1px;
  transform: rotate(30deg);
}
.leg.right {
  left: 3px;
  transform: rotate(-30deg);
}
.animate-leg-left {
  animation: legLeftSway 2.8s infinite ease-in-out alternate;
}
.animate-leg-right {
  animation: legRightSway 3.2s infinite ease-in-out alternate;
}
@keyframes ropeSway {
  0% { transform: rotate(-2deg); }
  100% { transform: rotate(2deg); }
}
@keyframes headSway {
  0% { transform: translateX(0); }
  100% { transform: translateX(3px); }
}
@keyframes bodySway {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(3deg); }
}
@keyframes armLeftSway {
  0% { transform: rotate(20deg); }
  100% { transform: rotate(10deg); }
}
@keyframes armRightSway {
  0% { transform: rotate(350deg); }
  100% { transform: rotate(340deg); }
}
@keyframes legLeftSway {
  0% { transform: rotate(30deg); }
  100% { transform: rotate(20deg); }
}
@keyframes legRightSway {
  0% { transform: rotate(-30deg); }
  100% { transform: rotate(-20deg); }
}
</style>
