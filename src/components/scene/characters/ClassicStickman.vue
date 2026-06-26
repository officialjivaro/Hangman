<template>
  <g class="classic-stickman" aria-hidden="true">
    <g v-if="wrongGuesses >= 1" class="classic-stickman__head">
      <circle cx="0" cy="28" r="27" />
      <circle class="classic-stickman__eye" cx="-9" cy="23" r="2.8" />
      <circle class="classic-stickman__eye" cx="9" cy="23" r="2.8" />
      <path class="classic-stickman__mouth" d="M-10 39 Q0 32 10 39" />
    </g>

    <g v-if="wrongGuesses >= 2" class="classic-stickman__torso">
      <line x1="0" y1="55" x2="0" y2="145" />
    </g>

    <g v-if="wrongGuesses >= 3" class="classic-stickman__limb classic-stickman__left-arm">
      <line x1="0" y1="77" x2="-42" y2="137" />
    </g>

    <g v-if="wrongGuesses >= 4" class="classic-stickman__limb classic-stickman__right-arm">
      <line x1="0" y1="77" x2="42" y2="137" />
    </g>

    <g v-if="wrongGuesses >= 5" class="classic-stickman__limb classic-stickman__left-leg">
      <line x1="0" y1="145" x2="-34" y2="211" />
    </g>

    <g v-if="wrongGuesses >= 6" class="classic-stickman__limb classic-stickman__right-leg">
      <line x1="0" y1="145" x2="34" y2="211" />
    </g>
  </g>
</template>

<script setup>
defineProps({
  wrongGuesses: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.classic-stickman {
  color: var(--theme-character-stroke);
  filter: drop-shadow(0 7px 7px rgba(0, 0, 0, 0.42));
}

.classic-stickman circle,
.classic-stickman line,
.classic-stickman path {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 7;
}

.classic-stickman__eye {
  fill: currentColor !important;
  stroke: none !important;
}

.classic-stickman__mouth {
  stroke-width: 4 !important;
}

.classic-stickman__head {
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: classicHead 3.8s ease-in-out infinite alternate;
}

.classic-stickman__torso {
  transform-box: fill-box;
  transform-origin: center top;
  animation: classicTorso 4.2s ease-in-out infinite alternate;
}

.classic-stickman__limb {
  transform-box: fill-box;
  animation-duration: 3.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.classic-stickman__left-arm,
.classic-stickman__left-leg {
  transform-origin: right top;
}

.classic-stickman__right-arm,
.classic-stickman__right-leg {
  transform-origin: left top;
}

.classic-stickman__left-arm {
  animation-name: classicLeftArm;
}

.classic-stickman__right-arm {
  animation-name: classicRightArm;
  animation-duration: 3.55s;
}

.classic-stickman__left-leg {
  animation-name: classicLeftLeg;
  animation-duration: 3.7s;
}

.classic-stickman__right-leg {
  animation-name: classicRightLeg;
  animation-duration: 3.35s;
}

@keyframes classicHead {
  from { transform: rotate(-1.2deg) translateX(-1px); }
  to { transform: rotate(1.5deg) translateX(1.5px); }
}

@keyframes classicTorso {
  from { transform: rotate(-0.7deg); }
  to { transform: rotate(1.1deg); }
}

@keyframes classicLeftArm {
  from { transform: rotate(-2deg); }
  to { transform: rotate(3.4deg); }
}

@keyframes classicRightArm {
  from { transform: rotate(2.7deg); }
  to { transform: rotate(-2.2deg); }
}

@keyframes classicLeftLeg {
  from { transform: rotate(-1.8deg); }
  to { transform: rotate(2deg); }
}

@keyframes classicRightLeg {
  from { transform: rotate(1.5deg); }
  to { transform: rotate(-2.4deg); }
}
</style>
