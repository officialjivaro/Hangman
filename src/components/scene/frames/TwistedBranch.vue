<template>
  <g class="twisted-branch" aria-hidden="true">
    <path class="twisted-branch__ground" d="M70 532 C201 510 355 524 741 516" />
    <path class="twisted-branch__shadow" d="M183 520 C153 430 169 345 142 273 C124 225 139 164 175 105 C226 164 283 159 327 135 C389 100 446 131 524 128" />
    <path class="twisted-branch__trunk" d="M169 520 C139 429 156 344 129 272 C111 224 126 162 163 96 C217 157 278 151 321 126 C383 91 448 121 526 117" />
    <path class="twisted-branch__fork" d="M157 249 C107 218 84 174 74 125 M171 190 C227 170 249 137 267 91 M324 127 C348 83 373 60 407 46" />
    <path class="twisted-branch__twigs" d="M80 133 L42 102 M78 129 L88 80 M264 94 L255 54 M266 92 L304 61 M405 48 L434 22 M403 50 L392 18 M466 117 L489 79" />
    <path class="twisted-branch__bark" d="M150 457 C175 411 143 368 160 322 M142 286 C165 254 133 215 159 174 M221 149 C252 135 270 139 297 128 M355 113 C397 106 430 117 460 116" />
    <path class="twisted-branch__hook" d="M496 113 C516 112 529 119 520 145" />
    <circle class="twisted-branch__knot" cx="158" cy="286" r="13" />
    <circle class="twisted-branch__knot" cx="311" cy="128" r="9" />
  </g>
</template>

<script setup>
</script>

<style scoped>
.twisted-branch {
  filter: drop-shadow(0 16px 17px rgba(0, 0, 0, 0.5));
}

.twisted-branch__ground {
  fill: none;
  stroke: rgba(0, 0, 0, 0.52);
  stroke-linecap: round;
  stroke-width: 19;
}

.twisted-branch__shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.58);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 44;
}

.twisted-branch__trunk,
.twisted-branch__fork,
.twisted-branch__twigs {
  fill: none;
  stroke: var(--theme-frame);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.twisted-branch__trunk {
  stroke-width: 34;
}

.twisted-branch__fork {
  stroke-width: 18;
}

.twisted-branch__twigs {
  stroke-width: 9;
}

.twisted-branch__bark {
  fill: none;
  stroke: color-mix(in srgb, var(--theme-frame-highlight) 66%, transparent);
  stroke-linecap: round;
  stroke-width: 5;
}

.twisted-branch__hook {
  fill: none;
  stroke: var(--theme-frame-highlight);
  stroke-linecap: round;
  stroke-width: 9;
}

.twisted-branch__knot {
  fill: color-mix(in srgb, var(--theme-frame-highlight) 75%, var(--theme-frame));
  stroke: rgba(0, 0, 0, 0.32);
  stroke-width: 3;
}
</style>
