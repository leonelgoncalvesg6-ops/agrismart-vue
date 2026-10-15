<template>
  <main class="page">
    <section class="hero wrap">
      <p class="eyebrow">Weather Information</p>
      <h1>Farm Weather Forecast</h1>
      <p class="lede">
        Get local weather forecasts and farm-specific advice so you can plan
        irrigation, planting, and harvesting intelligently.
      </p>

      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input type="text" placeholder="Search by region..." :value="searchQuery" @input="onSearch" />
      </div>
    </section>

    <section class="wrap results">
      <p class="results__count" v-if="!loading">
        Showing <strong>{{ forecasts.length }}</strong> forecasts
      </p>

      <div v-if="loading" class="loading">Loading forecasts…</div>
      <div v-else-if="error" class="loading loading--error">Error: {{ error }}</div>
      <div v-else>
        <div class="date-group" v-for="group in groupedByDate" :key="group.date">
          <h2 class="date-group__title">{{ formatDate(group.date) }}</h2>
          <div class="grid">
            <article class="weather-card" v-for="f in group.items" :key="f.id">
              <div class="weather-card__top">
                <div class="weather-card__icon" :class="`weather-card__icon--${iconClass(f.condition)}`">
                  <span v-html="weatherIcon(f.condition)"></span>
                </div>
                <div>
                  <h3>{{ f.location }}</h3>
                  <p class="weather-card__condition">{{ f.condition }}</p>
                </div>
              </div>
              <div class="weather-card__temp">{{ f.temperature }}°C</div>
              <div class="weather-card__details">
                <div class="weather-card__detail">
                  <span>Humidity</span>
                  <strong>{{ f.humidity }}%</strong>
                </div>
                <div class="weather-card__detail">
                  <span>Wind</span>
                  <strong>{{ f.wind_speed }} km/h</strong>
                </div>
                <div class="weather-card__detail">
                  <span>Rain Chance</span>
                  <strong :class="{ 'rain-high': f.rainfall_chance >= 50 }">{{ f.rainfall_chance }}%</strong>
                </div>
              </div>
              <div class="weather-card__advice">
                <p>{{ farmAdvice(f) }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap">
      <div class="info-panel">
        <div class="info-panel__item">
          <h3>Plan Irrigation</h3>
          <p>
            Check rainfall probability before watering. If rain chance is above
            60%, you may skip irrigation for that day.
          </p>
        </div>
        <div class="info-panel__item">
          <h3>Time Your Planting</h3>
          <p>
            Sow seeds ahead of light rainfall for natural germination. Avoid
            planting during heavy rain forecasts to prevent seed washout.
          </p>
        </div>
        <div class="info-panel__item">
          <h3>Harvest Smart</h3>
          <p>
            Plan harvests during dry windows. Crops harvested in wet conditions
            are prone to mold and storage losses.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getWeather } from '../api'

const forecasts = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const groupedByDate = computed(() => {
  const groups = {}
  for (const f of forecasts.value) {
    if (!groups[f.forecast_date]) groups[f.forecast_date] = []
    groups[f.forecast_date].push(f)
  }
  return Object.entries(groups).map(([date, items]) => ({ date, items }))
})

async function loadForecasts(search = '') {
  loading.value = true
  error.value = null
  try {
    const params = search ? { location: search } : {}
    forecasts.value = await getWeather(params)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => loadForecasts())

function onSearch(e) {
  searchQuery.value = e.target.value
  loadForecasts(e.target.value)
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

function iconClass(condition) {
  const c = condition.toLowerCase()
  if (c.includes('sunny')) return 'sunny'
  if (c.includes('partly')) return 'partly'
  if (c.includes('cloud')) return 'cloudy'
  if (c.includes('rain')) return 'rain'
  return 'default'
}

function weatherIcon(condition) {
  const c = condition.toLowerCase()
  if (c.includes('sunny')) return '&#9728;'
  if (c.includes('partly')) return '&#9925;'
  if (c.includes('cloud')) return '&#9729;'
  if (c.includes('rain')) return '&#127783;'
  return '&#9728;'
}

function farmAdvice(f) {
  if (f.rainfall_chance >= 70) {
    return `High rain chance — skip irrigation, ensure drainage channels are clear, and delay any pesticide application.`
  }
  if (f.rainfall_chance >= 40) {
    return `Moderate rain chance — hold off on irrigation and plan outdoor tasks for the morning.`
  }
  if (f.temperature > 30) {
    return `Hot and dry — increase irrigation frequency and water early morning or evening to reduce evaporation.`
  }
  if (f.humidity > 75) {
    return `High humidity — monitor crops for fungal diseases. Ensure good airflow and avoid overhead watering.`
  }
  return `Good farming weather — ideal for planting, fertilizing, and field work.`
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 60px 32px;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}
.loading--error { color: var(--color-tag-high-text); }

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

.results { padding-top: 32px; }

.results__count {
  color: var(--color-text-muted);
  margin: 0 0 20px;
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
}

.results__count strong { color: var(--color-text); }

.date-group { margin-bottom: 36px; }

.date-group__title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  margin: 0 0 16px;
  color: var(--color-green-deep);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.weather-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  box-shadow: var(--shadow-card);
}

.weather-card__top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.weather-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--color-green-light);
}

.weather-card__icon--sunny { background: #FEF3C7; }
.weather-card__icon--partly { background: #E0F2FE; }
.weather-card__icon--cloudy { background: #F1F5F9; }
.weather-card__icon--rain { background: #DBEAFE; }

.weather-card__top h3 {
  font-family: var(--font-display);
  font-size: 0.98rem;
  margin: 0 0 2px;
}

.weather-card__condition {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin: 0;
}

.weather-card__temp {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-green-deep);
  margin-bottom: 16px;
}

.weather-card__details {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding-top: 14px;
  margin-bottom: 14px;
}

.weather-card__detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.weather-card__detail span {
  font-size: 0.74rem;
  color: var(--color-text-muted);
}

.weather-card__detail strong {
  font-size: 0.88rem;
}

.rain-high { color: var(--color-tag-high-text); }

.weather-card__advice {
  background: var(--color-cream-panel);
  border-radius: var(--radius-md);
  padding: 12px 14px;
}

.weather-card__advice p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.info-panel {
  margin-top: 40px;
  background: var(--color-cream-panel);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
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
  .grid { grid-template-columns: repeat(2, 1fr); }
  .info-panel { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  h1 { font-size: 1.9rem; }
}
</style>
