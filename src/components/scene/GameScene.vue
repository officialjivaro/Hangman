<template>
  <section
    class="game-scene"
    :class="[
      `game-scene--${theme.atmosphere}`,
      `game-scene--motion-${theme.motionStrength}`
    ]"
    aria-label="Hangman scene"
  >
    <!-- Background Artwork | Uses dedicated desktop and mobile compositions -->
    <picture class="game-scene__picture">
      <source
        :srcset="theme.mobileBackground"
        media="(max-width: 760px) and (orientation: portrait)"
      />
      <img
        class="game-scene__background"
        :src="theme.desktopBackground"
        alt=""
        fetchpriority="high"
      />
    </picture>

    <div class="game-scene__shade" aria-hidden="true"></div>
    <div class="game-scene__fog game-scene__fog--back" aria-hidden="true"></div>
    <div class="game-scene__fog game-scene__fog--front" aria-hidden="true"></div>

    <!-- Scene Rig | Shares one coordinate system for frame, rope, and character -->
    <svg
      class="game-scene__rig"
      viewBox="0 0 800 600"
      role="img"
      :aria-label="`Hangman drawing showing ${Math.min(wrongGuesses, 6)} of 6 body parts`"
      preserveAspectRatio="xMidYMid meet"
    >
      <HangingFrame :frame-id="frameId" />
      <g class="game-scene__suspended-rig">
        <path class="game-scene__rope-shadow" d="M520 145 C516 169 522 190 520 216" />
        <path class="game-scene__rope" d="M520 145 C516 169 522 190 520 216" />
        <HangmanCharacter
          :character-id="characterId"
          :wrong-guesses="wrongGuesses"
          :x="520"
          :y="214"
        />
      </g>
    </svg>

    <div class="game-scene__caption" aria-hidden="true">
      <span>{{ theme.name }}</span>
    </div>
  </section>
</template>

<script setup>
import HangingFrame from './HangingFrame.vue'
import HangmanCharacter from './HangmanCharacter.vue'

defineProps({
  theme: {
    type: Object,
    required: true
  },
  characterId: {
    type: String,
    default: 'classic-stickman'
  },
  frameId: {
    type: String,
    default: 'crooked-gallows'
  },
  wrongGuesses: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.game-scene {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: 1.45rem 1.05rem 1.65rem 1rem;
  background: var(--theme-background);
  box-shadow: var(--shadow-deep);
  isolation: isolate;
}

.game-scene__picture,
.game-scene__background,
.game-scene__shade,
.game-scene__fog,
.game-scene__rig {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.game-scene__background {
  object-fit: cover;
  object-position: center;
}

.game-scene__shade {
  z-index: 1;
  background:
    radial-gradient(circle at 57% 35%, transparent 0 25%, rgba(2, 3, 8, 0.08) 52%, rgba(2, 3, 8, 0.45) 100%),
    linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent 25% 75%, rgba(0, 0, 0, 0.18));
}

.game-scene__fog {
  z-index: 2;
  pointer-events: none;
  opacity: 0.65;
  background:
    radial-gradient(ellipse at 12% 75%, var(--theme-fog), transparent 37%),
    radial-gradient(ellipse at 56% 78%, var(--theme-fog), transparent 34%),
    radial-gradient(ellipse at 91% 73%, var(--theme-fog), transparent 34%);
  filter: blur(16px);
}

.game-scene__fog--back {
  animation: fogBack 14s ease-in-out infinite alternate;
}

.game-scene__fog--front {
  z-index: 5;
  opacity: 0.38;
  transform: translateY(7%);
  animation: fogFront 10s ease-in-out infinite alternate-reverse;
}

.game-scene__rig {
  z-index: 4;
  overflow: visible;
}

.game-scene__suspended-rig {
  transform-box: view-box;
  transform-origin: 520px 145px;
  animation: rigSway 4.8s ease-in-out infinite alternate;
}

.game-scene--motion-playful .game-scene__suspended-rig {
  animation-duration: 3.8s;
}

.game-scene__rope-shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.55);
  stroke-linecap: round;
  stroke-width: 12;
}

.game-scene__rope {
  fill: none;
  stroke: color-mix(in srgb, var(--theme-frame-highlight) 72%, #24180f);
  stroke-linecap: round;
  stroke-width: 7;
}

.game-scene__caption {
  position: absolute;
  z-index: 6;
  left: 1rem;
  bottom: 0.8rem;
  padding: 0.35rem 0.58rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-pill);
  color: color-mix(in srgb, var(--theme-text) 82%, transparent);
  background: rgba(4, 5, 9, 0.48);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

@keyframes rigSway {
  from { transform: rotate(-1.25deg); }
  to { transform: rotate(1.5deg); }
}

@keyframes fogBack {
  from { transform: translateX(-3%) scale(1.04); }
  to { transform: translateX(3%) scale(1.08); }
}

@keyframes fogFront {
  from { transform: translate(-4%, 7%) scale(1.03); }
  to { transform: translate(4%, 9%) scale(1.08); }
}

@media (max-width: 760px) and (orientation: portrait) {
  .game-scene {
    border-radius: 1rem 0.8rem 1.2rem 0.75rem;
  }

  .game-scene__rig {
    transform: scale(1.04);
    transform-origin: center center;
  }

  .game-scene__caption {
    left: 0.65rem;
    bottom: 0.55rem;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .game-scene__caption {
    display: none;
  }
}
</style>
