<template>
  <article class="card">
    <div class="card__image">
      <img :src="issue.image" :alt="issue.name" loading="lazy" />
    </div>
    <div class="card__body">
      <div class="card__title-row">
        <h3>{{ issue.name }}</h3>
        <span class="tag" :class="tagClass">{{ issue.severity }}</span>
      </div>
      <p class="card__crop">{{ issue.affectedCrop }}</p>

      <p class="card__symptoms-label">Symptoms:</p>
      <p class="card__symptoms">{{ issue.symptoms }}</p>

      <button class="card__cta">View Treatment</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
})

const tagClass = computed(() => `tag--${props.issue.severity.toLowerCase()}`)
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
  flex: 1;
}

.card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.card__title-row h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
}

.card__crop {
  margin: 0 0 12px;
  color: var(--color-text-muted);
  font-size: 0.86rem;
}

.tag {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag--high {
  background: var(--color-tag-high-bg);
  color: var(--color-tag-high-text);
}

.tag--medium {
  background: var(--color-tag-medium-bg);
  color: var(--color-tag-medium-text);
}

.card__symptoms-label {
  margin: 0;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--color-text);
}

.card__symptoms {
  margin: 2px 0 16px;
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}

.card__cta {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
}

.card__cta:hover {
  background: var(--color-green);
}
</style>
