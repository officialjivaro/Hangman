<template>
  <div class="difficulty-selector">
    <select v-model="selectedDifficulty">
      <option v-for="level in difficulties" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  difficulties: {
    type: Array,
    default: () => ['Easy','Medium','Hard']
  }
})
const emits = defineEmits(['update:difficulty'])
const selectedDifficulty = ref(props.difficulties[0])

watch(selectedDifficulty, value => {
  emits('update:difficulty', value)
})
</script>

<style scoped>
.difficulty-selector {
  margin: 10px 0;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

select {
  width: 150px;
  padding: 10px;
  background-color: #fff;
  color: #333;
  border: 1px solid #999;
  border-radius: 4px;
  appearance: none;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'14'%20height%3D'14'%20viewBox%3D'0%200%2010%2010'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Cpath%20fill%3D'%23333'%20d%3D'M0%2C0%20l5%2C5%205-5%20l-10%2C0Z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}
select:hover {
  border-color: #666;
}
</style>
