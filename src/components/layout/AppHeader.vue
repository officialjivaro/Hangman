<template>
  <header class="app-header">
    <a
      class="app-header__back-link"
      href="https://jivaro.net/misc/games-and-fun-by-category"
      target="_top"
    >
      <span aria-hidden="true">←</span>
      <span>Games &amp; Fun</span>
    </a>

    <div class="app-header__title-group">
      <span class="app-header__eyebrow">A crooked little word game</span>
      <h1 class="app-header__title">Hangman</h1>
    </div>

    <div class="app-header__ornament" aria-hidden="true">✦</div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  position: relative;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) auto minmax(8rem, 1fr);
  align-items: center;
  width: 100%;
  height: var(--header-height);
  min-height: var(--header-height);
  padding:
    max(0.35rem, env(safe-area-inset-top))
    max(1rem, env(safe-area-inset-right))
    0.35rem
    max(1rem, env(safe-area-inset-left));
  border-bottom: 1px solid var(--theme-border);
  color: var(--theme-text);
  background:
    linear-gradient(180deg, rgba(4, 5, 10, 0.9), rgba(9, 8, 16, 0.77)),
    repeating-linear-gradient(96deg, transparent 0 22px, rgba(255, 255, 255, 0.018) 23px 24px);
  box-shadow: 0 0.45rem 1.6rem rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(12px);
}

.app-header__back-link {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 0.4rem;
  min-height: 2.5rem;
  padding: 0.52rem 0.85rem;
  border: 1px solid var(--theme-border);
  border-radius: 0.65rem 0.9rem 0.6rem 0.82rem;
  color: var(--theme-text);
  background: rgba(0, 0, 0, 0.28);
  font-size: 0.86rem;
  font-weight: 800;
  text-decoration: none;
  transition: transform var(--transition-fast) ease, background var(--transition-fast) ease;
}

.app-header__back-link:hover {
  transform: translateY(-0.1rem) rotate(-0.5deg);
  background: color-mix(in srgb, var(--theme-accent) 24%, rgba(0, 0, 0, 0.38));
}

.app-header__title-group {
  display: grid;
  justify-items: center;
  line-height: 1;
}

.app-header__eyebrow {
  color: var(--theme-muted);
  font-size: clamp(0.56rem, 1.2vw, 0.72rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.app-header__title {
  margin: 0.1rem 0 0;
  color: var(--theme-text);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3.4vw, 2.65rem);
  letter-spacing: 0.045em;
  text-shadow: 0.1rem 0.18rem 0 rgba(0, 0, 0, 0.8), 0 0 1rem color-mix(in srgb, var(--theme-accent) 34%, transparent);
  transform: rotate(-0.8deg);
}

.app-header__ornament {
  justify-self: end;
  color: var(--theme-accent);
  font-size: clamp(1.05rem, 2.5vw, 1.6rem);
  filter: drop-shadow(0 0 0.45rem color-mix(in srgb, var(--theme-accent) 65%, transparent));
}

@media (max-width: 600px) {
  .app-header {
    grid-template-columns: auto 1fr auto;
    padding-right: max(0.65rem, env(safe-area-inset-right));
    padding-left: max(0.65rem, env(safe-area-inset-left));
  }

  .app-header__back-link {
    min-width: 2.6rem;
    padding: 0.5rem 0.62rem;
  }

  .app-header__back-link span:last-child,
  .app-header__eyebrow {
    display: none;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .app-header__eyebrow {
    display: none;
  }
}
</style>
