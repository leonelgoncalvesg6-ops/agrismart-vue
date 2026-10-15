<template>
  <main class="page">
    <section class="hero wrap">
      <p class="eyebrow">Comprehensive Library</p>
      <h1>Explore Crops</h1>
      <p class="lede">
        Browse our complete crop database to find the right crops for your
        farm and climate.
      </p>

      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input type="text" placeholder="Search crops by name or category..." :value="searchQuery" @input="onSearch" />
      </div>

      <FilterBar :filters="filters" />
    </section>

    <section class="wrap results">
      <p class="results__count" v-if="!loading">
        Showing <strong>{{ crops.length }}</strong> crops
      </p>

      <div v-if="loading" class="loading">Loading crops…</div>
      <div v-else-if="error" class="loading loading--error">Error: {{ error }}</div>
      <div v-else class="grid">
        <CropCard v-for="crop in crops" :key="crop.name" :crop="crop" />
      </div>

      <div class="load-more">
        <button class="btn-outline">Load More Crops</button>
      </div>
    </section>

    <section class="wrap">
      <div class="cta-panel">
        <h2>Not sure which crop to choose?</h2>
        <p>
          Use our smart crop recommendation tool to get personalized
          suggestions based on your farm conditions and goals.
        </p>
        <button class="btn-primary">Get Recommendations</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import CropCard from '../components/CropCard.vue'
import { getCrops } from '../api'

const crops = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filters = ['Category', 'Season', 'Water Requirement', 'Difficulty Level', 'Soil Type']

async function loadCrops(search = '') {
  loading.value = true
  error.value = null
  try {
    const params = search ? { search } : {}
    crops.value = (await getCrops(params)).map(c => ({
      ...c,
      growingPeriod: c.growing_period
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => loadCrops())

function onSearch(e) {
  searchQuery.value = e.target.value
  loadCrops(e.target.value)
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

.page {
  padding-bottom: 80px;
}

.hero {
  padding: 48px 32px 32px;
}

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
  max-width: 100%;
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

.results {
  padding-top: 32px;
}

.results__count {
  color: var(--color-text-muted);
  margin: 0 0 20px;
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
}

.results__count strong {
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-outline {
  background: var(--color-green-light);
  border: 1px solid var(--color-green);
  color: var(--color-green-deep);
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 8px;
}

.btn-outline:hover {
  background: #b9dbb2;
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
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 1.9rem;
  }
}
</style>
