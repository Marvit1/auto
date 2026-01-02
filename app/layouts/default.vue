<template>
  <div class="layout">
    <SiteHeader />
    <main class="main-content">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const handler = (e) => {
    try {
      const reason = e && e.reason
      const message = (reason && (reason.message || reason)) || ''
      if (typeof message === 'string' && (message.includes('MetaMask') || message.includes('MetaMask extension') || message.includes('Failed to connect to MetaMask') || message.includes('inpage'))) {
        // Suppress noisy MetaMask not-found errors that come from extension-less environments
        // Keep a console warning so we can still see occurrences during development
        console.warn('Wallet connect suppressed:', message)
        e.preventDefault && e.preventDefault()
      }
    } catch (err) {
      // swallow any handler errors
    }
  }
  window.addEventListener('unhandledrejection', handler)
  onUnmounted(() => window.removeEventListener('unhandledrejection', handler))
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fdfdfd;
}

.main-content {
  flex: 1;
  /* Հեռացրել padding, max-width, margin - թողնել որ slot-ը ինքը կառավարի */
  width: 100%;
  box-sizing: border-box;
}
</style>