<template>
  <footer class="footer">
    <div class="wrap footer__grid">
      <div class="footer__brand">
        <p class="footer__logo">AgriSmart</p>
        <p class="footer__tagline">
          Practical agricultural information and smart tools for better
          farming decisions.
        </p>
        <div class="footer__social">
          <a href="#" aria-label="Facebook" class="footer__icon">f</a>
          <a href="#" aria-label="Twitter" class="footer__icon">t</a>
          <a href="#" aria-label="Instagram" class="footer__icon">ig</a>
          <a href="#" aria-label="YouTube" class="footer__icon">yt</a>
        </div>
      </div>

      <div class="footer__col">
        <h3>Quick Links</h3>
        <router-link to="/">Home</router-link>
        <router-link to="/crops">Crops</router-link>
        <router-link to="/farming-guides">Farming Guides</router-link>
        <router-link to="/smart-tools">Smart Tools</router-link>
        <router-link to="/weather">Weather</router-link>
      </div>

      <div class="footer__col">
        <h3>Resources</h3>
        <router-link to="/crops">Crop Recommendations</router-link>
        <router-link to="/diseases-pests">Disease Guide</router-link>
        <router-link to="/smart-tools">Farm Planner</router-link>
        <router-link to="/smart-tools">Cost Calculator</router-link>
        <router-link to="/farming-guides">Farming Tips</router-link>
      </div>

      <div class="footer__col">
        <h3>Contact</h3>
        <a href="mailto:hello@agrismart.com">hello@agrismart.com</a>
        <a href="tel:+18002744276">+1 800 AGRI SMART</a>
        <p>123 Farm Road, Agricultural District</p>
      </div>
    </div>

    <div class="wrap footer__bottom">
      <p>© 2024 AgriSmart. All rights reserved.</p>
      <p>Built for farmers, by farmers.</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: var(--color-footer-bg);
  color: var(--color-footer-text);
  padding-top: 56px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
}

.footer__logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--color-white);
  margin: 0 0 12px;
}

.footer__tagline {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 20px;
  max-width: 32ch;
}

.footer__social {
  display: flex;
  gap: 10px;
}

.footer__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.footer__col h3 {
  color: var(--color-white);
  font-size: 0.95rem;
  margin: 0 0 16px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
}

.footer__col a:hover {
  color: var(--color-white);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
}

@media (max-width: 800px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .footer__bottom {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
