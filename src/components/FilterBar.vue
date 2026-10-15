<template>
  <div class="filters">
    <button v-for="f in filters" :key="f" class="filters__chip">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 5h18M6 12h12M10 19h4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      {{ f }}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  filters: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filters__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.88rem;
  color: var(--color-text);
}

.filters__chip:hover {
  border-color: var(--color-green);
}
</style>
