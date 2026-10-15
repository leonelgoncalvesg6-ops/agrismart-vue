<template>
  <article class="card">
    <div class="card__image">
      <img :src="crop.image" :alt="crop.name" loading="lazy" />
    </div>
    <div class="card__body">
      <div class="card__title-row">
        <h3>{{ crop.name }}</h3>
        <span class="tag" :class="tagClass">{{ crop.difficulty }}</span>
      </div>
      <p class="card__category">{{ crop.category }}</p>

      <div class="card__meta">
        <div>
          <span class="card__meta-label">Growing Period</span>
          <span class="card__meta-value">{{ crop.growingPeriod }}</span>
        </div>
        <div>
          <span class="card__meta-label">Water</span>
          <span class="card__meta-value">{{ crop.water }}</span>
        </div>
      </div>

      <button class="card__cta">View Details</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  crop: {
    type: Object,
    required: true
  }
})

const tagClass = computed(() => {
  const level = props.crop.difficulty.toLowerCase()
  return `tag--${level}`
})
</script>

<style scoped>
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.card__image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-cream-panel);
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card__title-row h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.card__category {
  margin: 0 0 12px;
  color: var(--color-text-muted);
  font-size: 0.86rem;
}

.tag {
  font-size: 0.76rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.tag--easy {
  background: var(--color-tag-easy-bg);
  color: var(--color-tag-easy-text);
}

.tag--moderate {
  background: var(--color-tag-moderate-bg);
  color: var(--color-tag-moderate-text);
}

.card__meta {
  display: flex;
  justify-content: space-between;
  padding: 12px 0 16px;
  border-top: 1px solid var(--color-border);
  margin-top: 4px;
}

.card__meta > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card__meta-label {
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.card__meta-value {
  font-size: 0.88rem;
  font-weight: 600;
}

.card__cta {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.92rem;
  width: 100%;
}

.card__cta:hover {
  background: var(--color-green);
}
</style>
