<template>
  <main class="page">
    <section class="hero wrap">
      <p class="eyebrow">Knowledge Base</p>
      <h1>Farming Guides</h1>
      <p class="lede">
        Step-by-step guides covering everything from land preparation to
        harvesting — written for beginners and experienced farmers alike.
      </p>

      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input type="text" placeholder="Search guides by title..." :value="searchQuery" @input="onSearch" />
      </div>

      <FilterBar :filters="filters" />
    </section>

    <section class="wrap results">
      <p class="results__count" v-if="!loading">
        Showing <strong>{{ guides.length }}</strong> guides
      </p>

      <div v-if="loading" class="loading">Loading guides…</div>
      <div v-else-if="error" class="loading loading--error">Error: {{ error }}</div>
      <div v-else class="grid">
        <article class="guide-card" v-for="guide in guides" :key="guide.id">
          <div class="guide-card__image">
            <img :src="guide.image" :alt="guide.title" loading="lazy" />
          </div>
          <div class="guide-card__body">
            <div class="guide-card__title-row">
              <h3>{{ guide.title }}</h3>
              <span class="tag" :class="`tag--${guide.difficulty.toLowerCase()}`">{{ guide.difficulty }}</span>
            </div>
            <p class="guide-card__category">{{ guide.category }}</p>
            <p class="guide-card__summary">{{ guide.summary }}</p>
            <button class="guide-card__cta">Read Guide</button>
          </div>
        </article>
      </div>
    </section>

    <section class="wrap">
      <div class="cta-panel">
        <h2>Have a specific farming question?</h2>
        <p>
          Browse our complete knowledge base or contact us for personalized
          guidance on your farming challenges.
        </p>
        <button class="btn-primary">Contact Us</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import { getFarmingGuides } from '../api'

const guides = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filters = ['Category', 'Difficulty']

async function loadGuides(search = '') {
  loading.value = true
  error.value = null
  try {
    const params = search ? { search } : {}
    guides.value = await getFarmingGuides(params)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => loadGuides())

function onSearch(e) {
  searchQuery.value = e.target.value
  loadGuides(e.target.value)
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 60px 32px;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}
.loading--error {
  color: var(--color-tag-high-text);
}

.page { padding-bottom: 80px; }
.hero { padding: 48px 32px 32px; }

.eyebrow {
  color: var(--color-green);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 8px;
}

h1 {
  font-family: var(--font-display);
  font-size: 2.4rem;
  margin: 0 0 12px;
}

.lede {
  color: var(--color-text-muted);
  max-width: 60ch;
  margin: 0 0 28px;
}

.search {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 20px;
  color: var(--color-text-muted);
}

.search input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.95rem;
  background: transparent;
}

.results { padding-top: 32px; }

.results__count {
  color: var(--color-text-muted);
  margin: 0 0 20px;
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
}

.results__count strong { color: var(--color-text); }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.guide-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.guide-card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-cream-panel);
}

.guide-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.guide-card__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.guide-card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.guide-card__title-row h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
}

.tag {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag--beginner {
  background: var(--color-tag-easy-bg);
  color: var(--color-tag-easy-text);
}

.tag--intermediate {
  background: var(--color-tag-moderate-bg);
  color: var(--color-tag-moderate-text);
}

.tag--advanced {
  background: var(--color-tag-high-bg);
  color: var(--color-tag-high-text);
}

.guide-card__category {
  margin: 0 0 10px;
  color: var(--color-text-muted);
  font-size: 0.86rem;
}

.guide-card__summary {
  margin: 0 0 16px;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  line-height: 1.55;
  flex: 1;
}

.guide-card__cta {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
}

.guide-card__cta:hover {
  background: var(--color-green);
}

.cta-panel {
  margin-top: 56px;
  background: var(--color-green-light);
  border-radius: var(--radius-lg);
  padding: 56px 40px;
  text-align: center;
}

.cta-panel h2 {
  font-family: var(--font-display);
  margin: 0 0 12px;
  font-size: 1.6rem;
}

.cta-panel p {
  color: #3f5a3d;
  max-width: 52ch;
  margin: 0 auto 24px;
}

.btn-primary {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  font-weight: 600;
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.btn-primary:hover {
  background: var(--color-green);
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  h1 { font-size: 1.9rem; }
}
</style>
