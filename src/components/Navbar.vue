<template>
  <header class="nav">
    <div class="nav__inner wrap">
      <router-link to="/" class="nav__logo">AgriSmart</router-link>

      <nav class="nav__links" aria-label="Primary">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          :class="{ 'nav__link--active': isActive(link.to) }"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="nav__actions">
        <button class="btn btn--ghost">Login</button>
        <button class="btn btn--primary">Register</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Home' },
  { to: '/crops', label: 'Crops' },
  { to: '/farming-guides', label: 'Farming Guides' },
  { to: '/smart-tools', label: 'Smart Tools' },
  { to: '/diseases-pests', label: 'Diseases & Pests' },
  { to: '/weather', label: 'Weather' },
  { to: '/about', label: 'About' }
]

function isActive(to) {
  return route.path === to
}
</script>

<style scoped>
.nav {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 40;
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 24px;
}

.nav__logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--color-green-deep);
  flex-shrink: 0;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
  justify-content: center;
}

.nav__link {
  font-size: 0.94rem;
  color: var(--color-text);
  white-space: nowrap;
}

.nav__link--active,
.nav__link:hover {
  color: var(--color-green-deep);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.btn {
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.92rem;
  font-weight: 600;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.btn--ghost {
  background: transparent;
  border-color: var(--color-green-deep);
  color: var(--color-green-deep);
}

.btn--ghost:hover {
  background: var(--color-green-light);
}

.btn--primary {
  background: var(--color-green-deep);
  color: var(--color-white);
}

.btn--primary:hover {
  background: var(--color-green);
}

@media (max-width: 960px) {
  .nav__links {
    display: none;
  }
}
</style>
