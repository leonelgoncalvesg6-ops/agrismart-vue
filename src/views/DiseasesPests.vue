<template>
  <main class="page">
    <section class="hero wrap">
      <p class="eyebrow">Protection Guide</p>
      <h1>Diseases & Pests Guide</h1>
      <p class="lede">
        Identify common crop diseases and pests early. Find prevention and
        treatment strategies to protect your harvest.
      </p>

      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input type="text" placeholder="Search diseases and pests..." :value="searchQuery" @input="onSearch" />
      </div>

      <FilterBar :filters="filters" />
    </section>

    <section class="wrap">
      <div class="disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 003.34 20h17.32a1.5 1.5 0 001.23-2.34L13.71 3.86a1.5 1.5 0 00-2.42 0z"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div>
          <p class="disclaimer__title">Educational Information Disclaimer</p>
          <p class="disclaimer__body">
            Information provided by this system is for educational purposes
            and does not replace professional agricultural diagnosis. Always
            consult a qualified agricultural extension officer for accurate
            diagnosis and treatment advice.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap results">
      <p class="results__count" v-if="!loading">
        Showing <strong>{{ issues.length }}</strong> issues
      </p>

      <div v-if="loading" class="loading">Loading…</div>
      <div v-else-if="error" class="loading loading--error">Error: {{ error }}</div>
      <div v-else class="grid">
        <IssueCard v-for="issue in issues" :key="issue.name" :issue="issue" />
      </div>

      <div class="load-more">
        <button class="btn-outline">Load More</button>
      </div>
    </section>

    <section class="wrap">
      <div class="info-panel">
        <div class="info-panel__item">
          <div class="info-panel__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </div>
          <h3>Prevention</h3>
          <p>
            Regular monitoring, proper sanitation, crop rotation, and
            resistant varieties prevent most diseases and pests.
          </p>
        </div>
        <div class="info-panel__item">
          <div class="info-panel__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </div>
          <h3>Early Detection</h3>
          <p>
            Scout your crops weekly for early signs of problems. Early
            identification makes treatment simpler and more effective.
          </p>
        </div>
        <div class="info-panel__item">
          <div class="info-panel__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
          </div>
          <h3>Quick Action</h3>
          <p>
            Once identified, act fast with appropriate cultural, biological,
            or chemical control methods based on severity.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import IssueCard from '../components/IssueCard.vue'
import { getDiseasesPests } from '../api'

const issues = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filters = ['Type', 'Affected Crop', 'Severity']

async function loadIssues(search = '') {
  loading.value = true
  error.value = null
  try {
    const params = search ? { search } : {}
    issues.value = await getDiseasesPests(params)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => loadIssues())

function onSearch(e) {
  searchQuery.value = e.target.value
  loadIssues(e.target.value)
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
  font-size: 2.2rem;
  margin: 0 0 12px;
}

.lede {
  color: var(--color-text-muted);
  max-width: 62ch;
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

.disclaimer {
  background: var(--color-warning-bg);
  border-radius: var(--radius-md);
  padding: 22px 26px;
  display: flex;
  gap: 16px;
  color: #4a3410;
  margin-top: 8px;
}

.disclaimer__title {
  margin: 0 0 6px;
  font-weight: 700;
}

.disclaimer__body {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  max-width: 80ch;
}

.results {
  padding-top: 32px;
}

.results__count {
  color: var(--color-text-muted);
  margin: 0 0 20px;
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

.info-panel {
  margin-top: 56px;
  background: var(--color-cream-panel);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.info-panel__icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-green-light);
  color: var(--color-green-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.info-panel__item h3 {
  font-family: var(--font-display);
  margin: 0 0 8px;
  font-size: 1.05rem;
}

.info-panel__item p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .info-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
