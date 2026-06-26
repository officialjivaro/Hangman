<template>
  <g class="stitched-ragdoll" aria-hidden="true">
    <g v-if="wrongGuesses >= 1" class="stitched-ragdoll__head">
      <path class="stitched-ragdoll__fabric" d="M-28 4 Q-10 -9 15 -3 Q32 4 30 30 Q28 55 4 60 Q-21 63 -31 43 Q-39 21 -28 4 Z" />
      <circle class="stitched-ragdoll__button" cx="-10" cy="24" r="6" />
      <circle class="stitched-ragdoll__button" cx="11" cy="22" r="5" />
      <path class="stitched-ragdoll__thread" d="M-14 20 L-6 28 M-6 20 L-14 28 M7 18 L15 26 M15 18 L7 26" />
      <path class="stitched-ragdoll__smile" d="M-11 43 Q0 48 12 40" />
      <path class="stitched-ragdoll__stitches" d="M-29 14 L-20 17 M-31 33 L-21 31 M20 3 L18 13" />
    </g>

    <g v-if="wrongGuesses >= 2" class="stitched-ragdoll__torso">
      <path class="stitched-ragdoll__fabric" d="M-18 61 Q0 51 18 62 L22 139 Q1 151 -22 139 Z" />
      <path class="stitched-ragdoll__stitches" d="M0 60 L0 142 M-6 78 L6 78 M-6 98 L6 98 M-6 119 L6 119" />
      <path class="stitched-ragdoll__patch" d="M-14 95 Q-5 88 5 96 L2 118 Q-7 122 -15 115 Z" />
    </g>

    <g v-if="wrongGuesses >= 3" class="stitched-ragdoll__limb stitched-ragdoll__left-arm">
      <path class="stitched-ragdoll__fabric" d="M-14 72 Q-25 74 -31 87 L-55 133 Q-57 141 -49 146 Q-40 149 -35 139 L-5 87 Z" />
      <path class="stitched-ragdoll__stitches" d="M-29 91 L-20 96 M-44 119 L-35 124" />
    </g>

    <g v-if="wrongGuesses >= 4" class="stitched-ragdoll__limb stitched-ragdoll__right-arm">
      <path class="stitched-ragdoll__fabric" d="M14 72 Q25 74 31 87 L55 133 Q57 141 49 146 Q40 149 35 139 L5 87 Z" />
      <path class="stitched-ragdoll__stitches" d="M29 91 L20 96 M44 119 L35 124" />
    </g>

    <g v-if="wrongGuesses >= 5" class="stitched-ragdoll__limb stitched-ragdoll__left-leg">
      <path class="stitched-ragdoll__fabric" d="M-19 134 Q-6 130 1 140 L-23 205 Q-27 216 -38 212 Q-47 208 -42 198 Z" />
      <path class="stitched-ragdoll__stitches" d="M-15 156 L-6 160 M-28 186 L-18 190" />
    </g>

    <g v-if="wrongGuesses >= 6" class="stitched-ragdoll__limb stitched-ragdoll__right-leg">
      <path class="stitched-ragdoll__fabric" d="M19 134 Q6 130 -1 140 L23 205 Q27 216 38 212 Q47 208 42 198 Z" />
      <path class="stitched-ragdoll__stitches" d="M15 156 L6 160 M28 186 L18 190" />
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
.stitched-ragdoll {
  filter: drop-shadow(0 8px 9px rgba(0, 0, 0, 0.46));
}

.stitched-ragdoll__fabric {
  fill: var(--theme-character-fill);
  stroke: var(--theme-character-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 5;
}

.stitched-ragdoll__button {
  fill: #17131b;
  stroke: var(--theme-character-stroke);
  stroke-width: 2.5;
}

.stitched-ragdoll__thread,
.stitched-ragdoll__smile,
.stitched-ragdoll__stitches {
  fill: none;
  stroke: var(--theme-character-stroke);
  stroke-linecap: round;
  stroke-width: 3;
}

.stitched-ragdoll__patch {
  fill: color-mix(in srgb, var(--theme-accent-soft) 55%, var(--theme-character-fill));
  stroke: var(--theme-character-stroke);
  stroke-dasharray: 4 4;
  stroke-width: 2.5;
}

.stitched-ragdoll__head {
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: ragdollHead 3.5s ease-in-out infinite alternate;
}

.stitched-ragdoll__torso {
  transform-box: fill-box;
  transform-origin: center top;
  animation: ragdollTorso 3.9s ease-in-out infinite alternate;
}

.stitched-ragdoll__limb {
  transform-box: fill-box;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.stitched-ragdoll__left-arm,
.stitched-ragdoll__left-leg {
  transform-origin: right top;
}

.stitched-ragdoll__right-arm,
.stitched-ragdoll__right-leg {
  transform-origin: left top;
}

.stitched-ragdoll__left-arm {
  animation: ragdollLeftArm 3s ease-in-out infinite alternate;
}

.stitched-ragdoll__right-arm {
  animation: ragdollRightArm 3.35s ease-in-out infinite alternate;
}

.stitched-ragdoll__left-leg {
  animation: ragdollLeftLeg 3.55s ease-in-out infinite alternate;
}

.stitched-ragdoll__right-leg {
  animation: ragdollRightLeg 3.15s ease-in-out infinite alternate;
}

@keyframes ragdollHead {
  from { transform: rotate(-2deg) translateX(-1px); }
  to { transform: rotate(2.2deg) translateX(1.5px); }
}

@keyframes ragdollTorso {
  from { transform: rotate(-1.2deg); }
  to { transform: rotate(1.6deg); }
}

@keyframes ragdollLeftArm {
  from { transform: rotate(-2.5deg); }
  to { transform: rotate(4deg); }
}

@keyframes ragdollRightArm {
  from { transform: rotate(3deg); }
  to { transform: rotate(-3.5deg); }
}

@keyframes ragdollLeftLeg {
  from { transform: rotate(-2deg); }
  to { transform: rotate(2.8deg); }
}

@keyframes ragdollRightLeg {
  from { transform: rotate(2.4deg); }
  to { transform: rotate(-2.3deg); }
}
</style>
