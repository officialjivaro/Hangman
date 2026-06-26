<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--block': block }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-button {
  min-height: 2.75rem;
  padding: 0.7rem 1.15rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-medium);
  color: var(--theme-text);
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 0.28rem 0 rgba(0, 0, 0, 0.36), var(--shadow-small);
  transition:
    transform var(--transition-fast) ease,
    box-shadow var(--transition-fast) ease,
    filter var(--transition-fast) ease,
    opacity var(--transition-fast) ease;
}

.base-button:hover:not(:disabled) {
  transform: translateY(-0.16rem);
  box-shadow: 0 0.44rem 0 rgba(0, 0, 0, 0.34), var(--shadow-medium);
  filter: brightness(1.08);
}

.base-button:active:not(:disabled) {
  transform: translateY(0.08rem);
  box-shadow: 0 0.12rem 0 rgba(0, 0, 0, 0.4);
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.base-button--primary {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-accent) 88%, white), var(--theme-accent));
  color: #171219;
}

.base-button--secondary {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-surface) 84%, white), var(--theme-surface-strong));
}

.base-button--quiet {
  background: rgba(0, 0, 0, 0.18);
  box-shadow: none;
}

.base-button--danger {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-danger) 88%, white), var(--theme-danger));
  color: #1a1013;
}

.base-button--block {
  width: 100%;
}

@media (max-width: 540px), (max-height: 560px) {
  .base-button {
    min-height: 2.45rem;
    padding: 0.55rem 0.85rem;
    font-size: 0.9rem;
  }
}
</style>
