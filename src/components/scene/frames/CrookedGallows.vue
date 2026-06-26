<template>
  <g class="crooked-gallows" aria-hidden="true">
    <path class="crooked-gallows__ground" d="M84 526 C210 508 350 520 620 510 C682 507 726 516 765 528" />
    <path class="crooked-gallows__post-shadow" d="M190 514 C195 410 184 318 202 214 C210 171 206 128 219 91" />
    <path class="crooked-gallows__post" d="M177 514 C184 406 174 314 192 211 C199 168 195 126 208 86" />
    <path class="crooked-gallows__beam-shadow" d="M207 101 C299 93 409 112 527 128" />
    <path class="crooked-gallows__beam" d="M202 90 C298 82 413 102 527 118" />
    <path class="crooked-gallows__brace" d="M198 196 C260 152 305 126 350 104" />
    <path class="crooked-gallows__iron" d="M492 111 L529 117 L520 145" />
    <path class="crooked-gallows__grain" d="M190 432 C202 392 188 351 201 309 M205 244 C192 211 210 181 205 151 M282 94 C336 93 382 103 430 108" />
    <circle class="crooked-gallows__bolt" cx="203" cy="196" r="6" />
    <circle class="crooked-gallows__bolt" cx="347" cy="105" r="5" />
  </g>
</template>

<script setup>
</script>

<style scoped>
.crooked-gallows {
  filter: drop-shadow(0 15px 16px rgba(0, 0, 0, 0.48));
}

.crooked-gallows__ground {
  fill: none;
  stroke: rgba(0, 0, 0, 0.5);
  stroke-linecap: round;
  stroke-width: 18;
}

.crooked-gallows__post-shadow,
.crooked-gallows__beam-shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.58);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 35;
}

.crooked-gallows__post,
.crooked-gallows__beam,
.crooked-gallows__brace {
  fill: none;
  stroke: var(--theme-frame);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.crooked-gallows__post,
.crooked-gallows__beam {
  stroke-width: 28;
}

.crooked-gallows__brace {
  stroke-width: 17;
}

.crooked-gallows__iron {
  fill: none;
  stroke: var(--theme-frame-highlight);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 10;
}

.crooked-gallows__grain {
  fill: none;
  stroke: color-mix(in srgb, var(--theme-frame-highlight) 58%, transparent);
  stroke-linecap: round;
  stroke-width: 4;
}

.crooked-gallows__bolt {
  fill: var(--theme-frame-highlight);
  stroke: rgba(0, 0, 0, 0.35);
  stroke-width: 2;
}
</style>
