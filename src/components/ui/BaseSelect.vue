<template>
  <label class="base-select" :for="selectId">
    <span class="base-select__label">{{ label }}</span>
    <span v-if="description" class="base-select__description">{{ description }}</span>
    <span class="base-select__control-wrap">
      <select
        :id="selectId"
        class="base-select__control"
        :value="modelValue"
        :disabled="disabled"
        @change="emitValue"
      >
        <option
          v-for="option in normalizedOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="base-select__chevron" aria-hidden="true">⌄</span>
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const selectId = computed(() => props.id || `select-${props.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option }
    }

    return {
      value: option.value ?? option.id,
      label: option.label ?? option.name ?? option.value ?? option.id
    }
  })
})

function emitValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.base-select {
  display: grid;
  gap: 0.3rem;
  min-width: 0;
  color: var(--theme-text);
}

.base-select__label {
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.base-select__description {
  color: var(--theme-muted);
  font-size: 0.76rem;
  line-height: 1.25;
}

.base-select__control-wrap {
  position: relative;
  display: block;
}

.base-select__control {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.68rem 2.5rem 0.68rem 0.85rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-medium);
  appearance: none;
  color: var(--theme-text);
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-surface) 86%, white), var(--theme-surface-strong));
  box-shadow: var(--shadow-small);
  cursor: pointer;
}

.base-select__control:disabled {
  cursor: wait;
  opacity: 0.58;
}

.base-select__chevron {
  position: absolute;
  top: 50%;
  right: 0.9rem;
  color: var(--theme-accent);
  font-size: 1.15rem;
  pointer-events: none;
  transform: translateY(-57%);
}

@media (max-width: 540px), (max-height: 560px) {
  .base-select__control {
    min-height: 2.4rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.88rem;
  }

  .base-select__label {
    font-size: 0.72rem;
  }
}
</style>
