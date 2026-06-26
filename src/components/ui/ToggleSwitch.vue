<template>
  <label class="toggle-switch">
    <span class="toggle-switch__copy">
      <span class="toggle-switch__label">{{ label }}</span>
      <span v-if="description" class="toggle-switch__description">{{ description }}</span>
    </span>
    <span class="toggle-switch__track">
      <input
        class="toggle-switch__input"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="emitValue"
      />
      <span class="toggle-switch__slider" aria-hidden="true"></span>
    </span>
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.toggle-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--theme-text);
  cursor: pointer;
}

.toggle-switch__copy {
  display: grid;
  gap: 0.16rem;
  text-align: left;
}

.toggle-switch__label {
  font-weight: 800;
}

.toggle-switch__description {
  color: var(--theme-muted);
  font-size: 0.74rem;
}

.toggle-switch__track {
  position: relative;
  flex: 0 0 auto;
  width: 2.75rem;
  height: 1.45rem;
}

.toggle-switch__input {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.toggle-switch__slider {
  position: absolute;
  inset: 0;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.48);
  transition: background var(--transition-normal) ease;
}

.toggle-switch__slider::before {
  position: absolute;
  top: 0.16rem;
  left: 0.16rem;
  width: 1.02rem;
  height: 1.02rem;
  border-radius: 50%;
  background: var(--color-bone);
  box-shadow: 0 0.15rem 0.32rem rgba(0, 0, 0, 0.45);
  content: '';
  transition: transform var(--transition-normal) ease;
}

.toggle-switch__input:checked + .toggle-switch__slider {
  background: color-mix(in srgb, var(--theme-success) 78%, black);
}

.toggle-switch__input:checked + .toggle-switch__slider::before {
  transform: translateX(1.28rem);
}

.toggle-switch__input:focus-visible + .toggle-switch__slider {
  box-shadow: var(--focus-ring);
}

.toggle-switch__input:disabled {
  cursor: not-allowed;
}

.toggle-switch:has(.toggle-switch__input:disabled) {
  cursor: not-allowed;
  opacity: 0.52;
}
</style>
