<template>
  <main class="page">
    <section class="hero wrap">
      <p class="eyebrow">Farm Planning Tools</p>
      <h1>Smart Tools</h1>
      <p class="lede">
        Estimate your farming costs, plan your budget, and make informed
        decisions before you invest in your next season.
      </p>
    </section>

    <!-- TABS -->
    <section class="wrap">
      <div class="tabs">
        <button
          class="tab"
          :class="{ 'tab--active': activeTab === 'calculator' }"
          @click="activeTab = 'calculator'"
        >
          Cost & Profit Calculator
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': activeTab === 'planner' }"
          @click="activeTab = 'planner'"
        >
          Farm Task Planner
        </button>
      </div>
    </section>

    <!-- COST CALCULATOR -->
    <section v-if="activeTab === 'calculator'" class="wrap">
      <div v-if="loading" class="loading">Loading cost data…</div>
      <div v-else-if="error" class="loading loading--error">Error: {{ error }}</div>
      <div v-else class="calc">
        <div class="calc__left">
          <div class="calc__field">
            <label>Crop</label>
            <select v-model="selectedCrop">
              <option value="">Select a crop</option>
              <option v-for="crop in crops" :key="crop.id" :value="crop.id">
                {{ crop.name }}
              </option>
            </select>
          </div>
          <div class="calc__field">
            <label>Farm Size (acres)</label>
            <input type="number" v-model.number="farmSize" min="0.5" step="0.5" />
          </div>
          <div class="calc__field">
            <label>Expected Yield per acre (kg)</label>
            <input type="number" v-model.number="expectedYield" min="0" step="50" />
          </div>
          <div class="calc__field">
            <label>Expected Selling Price (per kg)</label>
            <input type="number" v-model.number="pricePerKg" min="0" step="0.5" />
          </div>

          <div class="calc__categories">
            <div class="cat" v-for="cat in costCategories" :key="cat.id">
              <p class="cat__name">{{ cat.name }}</p>
              <div class="cat__item" v-for="item in cat.items" :key="item.id">
                <label class="cat__item-label">
                  <input
                    type="checkbox"
                    :checked="isItemChecked(item.id)"
                    @change="toggleItem(item)"
                  />
                  {{ item.name }}
                </label>
                <div class="cat__item-cost">
                  <span class="cat__item-unit">{{ item.unit }}</span>
                  <input
                    type="number"
                    v-model.number="itemCosts[item.id]"
                    :disabled="!isItemChecked(item.id)"
                    min="0"
                    step="1"
                    class="cat__item-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calc__right">
          <div class="summary">
            <h2>Cost Summary</h2>
            <div class="summary__row">
              <span>Crop</span>
              <strong>{{ selectedCropName || '—' }}</strong>
            </div>
            <div class="summary__row">
              <span>Farm Size</span>
              <strong>{{ farmSize }} acres</strong>
            </div>
            <div class="summary__row summary__row--border">
              <span>Total Cost</span>
              <strong class="summary__total">{{ formatCurrency(totalCost) }}</strong>
            </div>
            <div class="summary__row">
              <span>Expected Yield</span>
              <strong>{{ (expectedYield * farmSize).toLocaleString() }} kg</strong>
            </div>
            <div class="summary__row">
              <span>Expected Revenue</span>
              <strong>{{ formatCurrency(expectedRevenue) }}</strong>
            </div>
            <div class="summary__row summary__row--border">
              <span>Estimated Profit</span>
              <strong
                class="summary__profit"
                :class="{ 'summary__profit--neg': estimatedProfit < 0 }"
              >
                {{ formatCurrency(estimatedProfit) }}
              </strong>
            </div>
            <div class="summary__row">
              <span>Profit Margin</span>
              <strong>{{ profitMargin }}%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FARM PLANNER -->
    <section v-if="activeTab === 'planner'" class="wrap">
      <div class="planner">
        <div class="planner__input">
          <h2>Create a Task</h2>
          <div class="calc__field">
            <label>Task Name</label>
            <input type="text" v-model="newTask.name" placeholder="e.g. Prepare land for tomato" />
          </div>
          <div class="calc__field">
            <label>Start Date</label>
            <input type="date" v-model="newTask.startDate" />
          </div>
          <div class="calc__field">
            <label>Target Completion</label>
            <input type="date" v-model="newTask.endDate" />
          </div>
          <div class="calc__field">
            <label>Notes</label>
            <textarea v-model="newTask.notes" rows="3" placeholder="Optional notes..."></textarea>
          </div>
          <button class="btn-primary" @click="addTask">Add Task</button>
        </div>

        <div class="planner__list">
          <h2>Farming Schedule ({{ tasks.length }})</h2>
          <div v-if="tasks.length === 0" class="planner__empty">
            No tasks yet. Add your first farming task to get started.
          </div>
          <div class="task" v-for="(task, i) in sortedTasks" :key="i">
            <div class="task__info">
              <h3>{{ task.name }}</h3>
              <p v-if="task.notes">{{ task.notes }}</p>
              <div class="task__dates">
                <span>Start: {{ task.startDate || '—' }}</span>
                <span>End: {{ task.endDate || '—' }}</span>
              </div>
            </div>
            <button class="task__remove" @click="removeTask(i)">Remove</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCrops, getCostCalculator } from '../api'

const activeTab = ref('calculator')
const loading = ref(true)
const error = ref(null)

const crops = ref([])
const costCategories = ref([])
const itemCosts = ref({})
const checkedItems = ref({})

const selectedCrop = ref('')
const farmSize = ref(1)
const expectedYield = ref(500)
const pricePerKg = ref(2)

const selectedCropName = computed(() => {
  const c = crops.value.find(c => c.id == selectedCrop.value)
  return c ? c.name : ''
})

const totalCost = computed(() => {
  let total = 0
  for (const cat of costCategories.value) {
    for (const item of cat.items) {
      if (checkedItems.value[item.id]) {
        const cost = itemCosts.value[item.id] ?? item.default_cost
        total += Number(cost) * (item.unit === 'one-time' ? 1 : farmSize.value)
      }
    }
  }
  return total
})

const expectedRevenue = computed(() => expectedYield.value * farmSize.value * pricePerKg.value)
const estimatedProfit = computed(() => expectedRevenue.value - totalCost.value)
const profitMargin = computed(() => {
  if (expectedRevenue.value === 0) return '0'
  return ((estimatedProfit.value / expectedRevenue.value) * 100).toFixed(1)
})

// Planner state
const newTask = ref({ name: '', startDate: '', endDate: '', notes: '' })
const tasks = ref([])

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return a.startDate.localeCompare(b.startDate)
  })
})

function isItemChecked(id) {
  return !!checkedItems.value[id]
}

function toggleItem(item) {
  if (checkedItems.value[item.id]) {
    delete checkedItems.value[item.id]
  } else {
    checkedItems.value[item.id] = true
    itemCosts.value[item.id] = item.default_cost
  }
}

function formatCurrency(val) {
  return '$' + Number(val).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

function addTask() {
  if (!newTask.value.name.trim()) return
  tasks.value.push({ ...newTask.value })
  newTask.value = { name: '', startDate: '', endDate: '', notes: '' }
}

function removeTask(index) {
  const realIndex = tasks.value.indexOf(sortedTasks.value[index])
  if (realIndex >= 0) tasks.value.splice(realIndex, 1)
}

onMounted(async () => {
  try {
    const [cropData, costData] = await Promise.all([getCrops(), getCostCalculator()])
    crops.value = cropData
    costCategories.value = costData
    // Initialize item costs with defaults
    for (const cat of costData) {
      for (const item of cat.items) {
        itemCosts.value[item.id] = item.default_cost
      }
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
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
  font-size: 2.4rem;
  margin: 0 0 12px;
}

.lede {
  color: var(--color-text-muted);
  max-width: 60ch;
  margin: 0 0 28px;
}

/* TABS */
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.tab {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 12px 22px;
  border-radius: 8px;
}

.tab--active {
  background: var(--color-green-deep);
  color: var(--color-white);
  border-color: var(--color-green-deep);
}

/* CALCULATOR */
.calc {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 32px;
}

.calc__field {
  margin-bottom: 18px;
}

.calc__field label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}

.calc__field input,
.calc__field select,
.calc__field textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.92rem;
  font-family: inherit;
  background: var(--color-white);
  color: var(--color-text);
}

.calc__field textarea {
  resize: vertical;
}

.calc__categories {
  margin-top: 24px;
}

.cat {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  margin-bottom: 16px;
}

.cat__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0 0 12px;
  color: var(--color-green-deep);
}

.cat__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border);
}

.cat__item:last-child { border-bottom: none; }

.cat__item-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  cursor: pointer;
}

.cat__item-cost {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat__item-unit {
  font-size: 0.76rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.cat__item-input {
  width: 80px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.85rem;
}

.cat__item-input:disabled {
  background: var(--color-cream-panel);
  opacity: 0.5;
}

/* SUMMARY */
.summary {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 26px;
  box-shadow: var(--shadow-card);
  position: sticky;
  top: 100px;
}

.summary h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 0 0 20px;
}

.summary__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.summary__row--border {
  border-top: 2px solid var(--color-border);
  margin-top: 8px;
  padding-top: 14px;
}

.summary__row strong {
  color: var(--color-text);
  font-size: 0.95rem;
}

.summary__total {
  font-family: var(--font-display);
  font-size: 1.1rem !important;
  color: var(--color-green-deep);
}

.summary__profit {
  font-family: var(--font-display);
  font-size: 1.1rem !important;
  color: var(--color-tag-easy-text);
}

.summary__profit--neg {
  color: var(--color-tag-high-text);
}

/* PLANNER */
.planner {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 32px;
}

.planner__input {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.planner__input h2,
.planner__list h2 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin: 0 0 20px;
}

.planner__list {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.planner__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 40px 16px;
  font-size: 0.92rem;
}

.task {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}

.task:last-child { border-bottom: none; }

.task__info h3 {
  font-family: var(--font-display);
  font-size: 0.98rem;
  margin: 0 0 6px;
}

.task__info p {
  font-size: 0.86rem;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}

.task__dates {
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.task__remove {
  background: none;
  border: 1px solid var(--color-tag-high-text);
  color: var(--color-tag-high-text);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.task__remove:hover {
  background: var(--color-tag-high-bg);
}

.btn-primary {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 0.92rem;
  margin-top: 8px;
}

.btn-primary:hover {
  background: var(--color-green);
}

@media (max-width: 900px) {
  .calc, .planner {
    grid-template-columns: 1fr;
  }
  .summary {
    position: static;
  }
}

@media (max-width: 600px) {
  h1 { font-size: 1.9rem; }
  .tabs { flex-direction: column; }
}
</style>
