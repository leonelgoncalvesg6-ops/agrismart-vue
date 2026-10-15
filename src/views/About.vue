<template>
  <main class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="wrap hero__content">
        <span class="badge">About AgriSmart</span>
        <h1>Empowering Farmers<br />With Smart Tools</h1>
        <p class="hero__lede">
          AgriSmart is a practical agriculture platform built to help
          small-scale and beginner farmers plan, manage, and improve
          their farming journey.
        </p>
      </div>
    </section>

    <!-- MISSION -->
    <section class="wrap mission">
      <p class="eyebrow eyebrow--center">Our Mission</p>
      <h2 class="center">Making Smart Farming Accessible to Everyone</h2>
      <p class="section-lede center">
        We believe that access to practical agricultural knowledge and
        easy-to-use tools should not be a barrier for any farmer. Our
        platform brings crop guides, weather forecasts, cost calculators,
        and farming tips together in one simple, accessible place.
      </p>

      <div class="stats-row">
        <div class="stat-box">
          <strong>50+</strong>
          <span>Crop Guides</span>
        </div>
        <div class="stat-box">
          <strong>100+</strong>
          <span>Farming Tips</span>
        </div>
        <div class="stat-box">
          <strong>8+</strong>
          <span>Detailed Guides</span>
        </div>
        <div class="stat-box">
          <strong>5+</strong>
          <span>Weather Regions</span>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="values">
      <div class="wrap">
        <p class="eyebrow eyebrow--center">What We Stand For</p>
        <h2 class="center">Our Core Values</h2>
        <p class="section-lede center">
          Everything we build is guided by these principles.
        </p>

        <div class="values__grid">
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </div>
            <h3>Practical</h3>
            <p>Every guide and tool is designed for real-world farming conditions, not theory.</p>
          </div>
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </div>
            <h3>Accessible</h3>
            <p>Information is presented clearly and simply, so even first-time farmers can get started.</p>
          </div>
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
              </svg>
            </div>
            <h3>Actionable</h3>
            <p>Our tools don't just inform — they help you make decisions and take action.</p>
          </div>
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </div>
            <h3>Seasonal</h3>
            <p>Content and tools adapt to your farming calendar, season, and region.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT WE OFFER -->
    <section class="wrap offer">
      <p class="eyebrow eyebrow--center">Platform Features</p>
      <h2 class="center">What AgriSmart Offers</h2>
      <p class="section-lede center">
        A complete toolkit for the modern small-scale farmer.
      </p>

      <div class="offer__grid">
        <div class="offer-item">
          <h3>Crop Library</h3>
          <p>Browse 50+ crop guides with growing periods, water needs, and difficulty ratings.</p>
        </div>
        <div class="offer-item">
          <h3>Disease & Pest Guide</h3>
          <p>Identify and treat common crop diseases and pests with treatment and prevention tips.</p>
        </div>
        <div class="offer-item">
          <h3>Farming Guides</h3>
          <p>Step-by-step guides from soil preparation to post-harvest storage, for all skill levels.</p>
        </div>
        <div class="offer-item">
          <h3>Cost Calculator</h3>
          <p>Estimate your total farming expenses and projected profit before you invest.</p>
        </div>
        <div class="offer-item">
          <h3>Weather Forecasts</h3>
          <p>Plan irrigation, planting, and harvesting with local weather data and farm advice.</p>
        </div>
        <div class="offer-item">
          <h3>Farm Planner</h3>
          <p>Build a farming schedule with tasks, deadlines, and notes to stay organized all season.</p>
        </div>
      </div>
    </section>

    <!-- CONTACT CTA -->
    <section class="wrap">
      <div class="contact-panel">
        <h2>Get in Touch</h2>
        <p>
          Have questions, feedback, or partnership ideas? We'd love to hear
          from you. Reach out and we'll get back to you soon.
        </p>
        <div class="contact-info">
          <a href="mailto:hello@agrismart.com" class="contact-info__item">hello@agrismart.com</a>
          <a href="tel:+18002744276" class="contact-info__item">+1 800 AGRI SMART</a>
          <span class="contact-info__item">123 Farm Road, Agricultural District</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.page { padding-bottom: 0; }

/* HERO */
.hero {
  position: relative;
  min-height: 420px;
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
    rgba(20, 35, 15, 0.78) 0%,
    rgba(20, 35, 15, 0.55) 45%,
    rgba(150, 100, 30, 0.3) 100%
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
  font-size: 2.8rem;
  line-height: 1.15;
  margin: 0 0 20px;
}

.hero__lede {
  font-size: 1.05rem;
  max-width: 48ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
}

/* MISSION */
.mission {
  padding: 72px 32px;
  text-align: center;
}

.eyebrow {
  color: var(--color-green);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 8px;
}

.eyebrow--center { text-align: center; }

.mission h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 12px;
}

.center { text-align: center; }

.section-lede {
  color: var(--color-text-muted);
  max-width: 60ch;
  margin: 0 auto 48px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-box {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 16px;
  box-shadow: var(--shadow-card);
  text-align: center;
}

.stat-box strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--color-green-deep);
  margin-bottom: 4px;
}

.stat-box span {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

/* VALUES */
.values {
  background: var(--color-cream-panel);
  padding: 72px 32px;
}

.values h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 12px;
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.value-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  text-align: center;
  box-shadow: var(--shadow-card);
}

.value-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-green-light);
  color: var(--color-green-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}

.value-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  margin: 0 0 10px;
}

.value-card p {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  line-height: 1.55;
  margin: 0;
}

/* OFFER */
.offer {
  padding: 72px 32px;
  text-align: center;
}

.offer h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 12px;
}

.offer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: left;
  margin-top: 48px;
}

.offer-item {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 26px;
  box-shadow: var(--shadow-card);
}

.offer-item h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  margin: 0 0 10px;
}

.offer-item p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* CONTACT */
.contact-panel {
  background: var(--color-green-light);
  border-radius: var(--radius-lg);
  padding: 56px 40px;
  text-align: center;
  margin-bottom: 80px;
}

.contact-panel h2 {
  font-family: var(--font-display);
  margin: 0 0 12px;
  font-size: 1.6rem;
}

.contact-panel > p {
  color: #3f5a3d;
  max-width: 52ch;
  margin: 0 auto 28px;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.contact-info__item {
  color: var(--color-green-deep);
  font-weight: 600;
  font-size: 0.9rem;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .values__grid { grid-template-columns: repeat(2, 1fr); }
  .offer__grid { grid-template-columns: repeat(2, 1fr); }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .hero h1 { font-size: 2.1rem; }
  .values__grid,
  .offer__grid,
  .stats-row { grid-template-columns: 1fr; }
}
</style>
