<template>
  <Navbar />
  <router-view />
  <SiteFooter />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
