<template>
  <main class="page">
    <div v-if="loading" class="wrap loading">Loading…</div>
    <div v-else-if="error" class="wrap loading loading--error">Error: {{ error }}</div>
    <template v-else>
    <!-- HERO -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="wrap hero__content">
        <span class="badge">Smart Agriculture Platform</span>
        <h1>Grow Smarter.<br />Farm Better.</h1>
        <p class="hero__lede">
          Practical agricultural information and smart tools to help you
          plan, manage, and improve your farming journey.
        </p>
        <div class="hero__actions">
          <button class="btn-primary">Get Started</button>
          <router-link to="/crops" class="btn-white">Explore Crops</router-link>
        </div>
        <div class="hero__stats">
          <div class="stat-pill stat-pill--accent">
            <strong>50+</strong>
            <span>Crop Guides</span>
          </div>
          <div class="stat-pill stat-pill--accent">
            <strong>100+</strong>
            <span>Farming Tips</span>
          </div>
          <div class="stat-pill">
            <span>Smart Recommendations</span>
          </div>
          <div class="stat-pill">
            <span>Practical Farm Tools</span>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT WE OFFER -->
    <section class="wrap offer">
      <p class="eyebrow eyebrow--center">What We Offer</p>
      <h2>Everything You Need to Farm Smarter</h2>
      <p class="section-lede">
        AgriSmart brings together the tools and knowledge that small-scale
        and beginner farmers need in one simple platform.
      </p>

      <div class="offer__grid">
        <div class="offer-card" v-for="item in offerItems" :key="item.title">
          <div class="offer-card__icon"></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <router-link :to="item.to">Learn More →</router-link>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-it-works">
      <div class="wrap">
        <p class="eyebrow eyebrow--center">Simple Process</p>
        <h2 class="center">How It Works</h2>
        <p class="section-lede center">
          Getting started with AgriSmart is simple and takes just a few
          minutes.
        </p>

        <div class="steps">
          <div class="steps__line"></div>
          <div class="step" v-for="(step, i) in steps" :key="step.title">
            <div class="step__circle">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED CROPS -->
    <section class="wrap featured">
      <div class="section-head">
        <div>
          <p class="eyebrow">Crop Library</p>
          <h2>Featured Crops</h2>
        </div>
        <router-link to="/crops" class="link-btn">View All Crops →</router-link>
      </div>

      <div class="featured__grid">
        <article class="mini-card" v-for="crop in featuredCrops" :key="crop.name">
          <div class="mini-card__image">
            <img :src="crop.image" :alt="crop.name" loading="lazy" />
          </div>
          <div class="mini-card__body">
            <div class="mini-card__title-row">
              <h3>{{ crop.name }}</h3>
              <span class="tag" :class="`tag--${crop.difficulty.toLowerCase()}`">{{ crop.difficulty }}</span>
            </div>
            <p class="mini-card__category">{{ crop.category }}</p>
            <div class="mini-card__meta">
              <div>
                <span>Growing Period</span>
                <strong>{{ crop.growingPeriod }}</strong>
              </div>
              <div>
                <span>Water</span>
                <strong>{{ crop.water }}</strong>
              </div>
            </div>
            <button class="mini-card__cta">View Details</button>
          </div>
        </article>
      </div>
    </section>

    <!-- FARMING TIPS -->
    <section class="tips">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="eyebrow">Knowledge Base</p>
            <h2>Recent Farming Tips</h2>
          </div>
          <router-link to="/farming-guides" class="link-btn link-btn--outline">View All Tips →</router-link>
        </div>

        <div class="tips__grid">
          <article class="tip-card" v-for="tip in tips" :key="tip.title">
            <div class="tip-card__icon"></div>
            <div>
              <p class="tip-card__category">{{ tip.category }}</p>
              <h3>{{ tip.title }}</h3>
              <p class="tip-card__body">{{ tip.body }}</p>
              <a href="#" class="tip-card__link">Read more →</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta">
      <div class="final-cta__overlay"></div>
      <div class="wrap final-cta__content">
        <h2>Ready to Start Your<br />Farming Journey?</h2>
        <p>
          Join thousands of farmers using AgriSmart to plan smarter, grow
          better, and earn more.
        </p>
        <button class="btn-tan">Start Planning</button>
      </div>
    </section>
    </template>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHomeData } from '../api'

const offerItems = ref([])
const steps = ref([])
const featuredCrops = ref([])
const tips = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const data = await getHomeData()
    offerItems.value = data.offerItems.map(o => ({ ...o, to: o.link }))
    steps.value = data.steps
    featuredCrops.value = data.featuredCrops.map(c => ({
      ...c,
      growingPeriod: c.growing_period
    }))
    tips.value = data.tips
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
  padding: 80px 32px;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}
.loading--error {
  color: var(--color-tag-high-text);
}

.page {
  padding-bottom: 0;
}

/* HERO */
.hero {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  background: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')
    center / cover no-repeat;
  color: var(--color-white);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(20, 35, 15, 0.72) 0%,
    rgba(20, 35, 15, 0.5) 45%,
    rgba(150, 100, 30, 0.25) 100%
  );
}

.hero__content {
  position: relative;
  padding: 64px 32px;
  max-width: 760px;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-green-deep);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 22px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1.15;
  margin: 0 0 20px;
}

.hero__lede {
  font-size: 1.05rem;
  max-width: 48ch;
  margin: 0 0 32px;
  color: rgba(255, 255, 255, 0.92);
}

.hero__actions {
  display: flex;
  gap: 14px;
  margin-bottom: 44px;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  font-weight: 600;
  padding: 14px 26px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.btn-primary:hover {
  background: var(--color-green);
}

.btn-white {
  background: var(--color-white);
  color: var(--color-text);
  font-weight: 600;
  padding: 14px 26px;
  border-radius: 8px;
  display: inline-block;
}

.btn-white:hover {
  background: #f2f2f2;
}

.hero__stats {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.stat-pill {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: 14px 20px;
  color: var(--color-text);
  min-width: 130px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.stat-pill strong {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--color-green-deep);
}

.stat-pill span {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* OFFER */
.offer {
  padding: 72px 32px;
  text-align: center;
}

.eyebrow {
  color: var(--color-green);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 8px;
}

.eyebrow--center {
  text-align: center;
}

.offer h2,
.how-it-works h2,
.featured h2,
.tips h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 12px;
}

.center {
  text-align: center;
}

.section-lede {
  color: var(--color-text-muted);
  max-width: 60ch;
  margin: 0 auto 48px;
}

.offer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: left;
}

.offer-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 30px 26px;
  box-shadow: var(--shadow-card);
}

.offer-card__icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--color-green-light);
  margin-bottom: 20px;
}

.offer-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  margin: 0 0 10px;
}

.offer-card p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 18px;
}

.offer-card a {
  color: var(--color-green-deep);
  font-weight: 600;
  font-size: 0.88rem;
}

/* HOW IT WORKS */
.how-it-works {
  background: var(--color-cream-panel);
  padding: 72px 32px;
}

.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.steps__line {
  position: absolute;
  top: 22px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: var(--color-border);
  z-index: 0;
}

.step {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 12px;
}

.step__circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-green-light);
  color: var(--color-green-deep);
  font-family: var(--font-display);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 3px solid var(--color-cream-panel);
}

.step h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  margin: 0 0 8px;
}

.step p {
  color: var(--color-text-muted);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0;
}

/* SECTION HEAD (shared) */
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}

.link-btn {
  border: 1px solid var(--color-green);
  color: var(--color-green-deep);
  font-weight: 600;
  font-size: 0.88rem;
  padding: 10px 18px;
  border-radius: 8px;
  white-space: nowrap;
}

.link-btn:hover {
  background: var(--color-green-light);
}

.link-btn--outline {
  background: var(--color-white);
}

/* FEATURED CROPS */
.featured {
  padding: 72px 32px;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.mini-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.mini-card__image {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.mini-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-card__body {
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mini-card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.mini-card__title-row h3 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin: 0;
}

.tag {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 8px;
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

.mini-card__category {
  margin: 0 0 8px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.mini-card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
  padding: 8px 0;
  margin-bottom: 10px;
}

.mini-card__meta div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mini-card__meta strong {
  color: var(--color-text);
  font-size: 0.78rem;
}

.mini-card__cta {
  background: var(--color-green-deep);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  padding: 9px;
  font-weight: 600;
  font-size: 0.8rem;
  width: 100%;
}

.mini-card__cta:hover {
  background: var(--color-green);
}

/* TIPS */
.tips {
  background: var(--color-green-light);
  padding: 72px 32px;
}

.tips__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.tip-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 26px;
  display: flex;
  gap: 18px;
  box-shadow: var(--shadow-card);
}

.tip-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-green-light);
  flex-shrink: 0;
}

.tip-card__category {
  color: var(--color-green-deep);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin: 0 0 6px;
}

.tip-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  margin: 0 0 10px;
}

.tip-card__body {
  color: var(--color-text-muted);
  font-size: 0.87rem;
  line-height: 1.6;
  margin: 0 0 12px;
}

.tip-card__link {
  color: var(--color-green-deep);
  font-weight: 600;
  font-size: 0.85rem;
}

/* FINAL CTA */
.final-cta {
  position: relative;
  padding: 96px 32px;
  text-align: center;
  color: var(--color-white);
  background: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')
    center / cover no-repeat;
}

.final-cta__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(30, 60, 30, 0.85),
    rgba(20, 40, 20, 0.9)
  );
}

.final-cta__content {
  position: relative;
}

.final-cta h2 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  margin: 0 0 16px;
}

.final-cta p {
  max-width: 50ch;
  margin: 0 auto 32px;
  color: rgba(255, 255, 255, 0.9);
}

.btn-tan {
  background: #d9a066;
  color: #2a1c0f;
  border: none;
  font-weight: 700;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.btn-tan:hover {
  background: #cf9155;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .offer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .steps {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 40px;
  }
  .steps__line {
    display: none;
  }
  .tips__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero h1 {
    font-size: 2.1rem;
  }
  .offer__grid,
  .featured__grid,
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
