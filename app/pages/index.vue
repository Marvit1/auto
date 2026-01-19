<template>
  <div class="home-page">
    <!-- Hero Section with Video Background -->
    <section class="hero-section">
      <!-- Video Background -->
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/buy.mp4" type="video/mp4">
      </video>
      
      <!-- Dark Overlay -->
      <div class="hero-overlay"></div>
      
      <!-- Content -->
      <div class="hero-content">
        <h1 class="page-title">{{ t('hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Featured Cars Grid - Container Width 
    <section class="featured-section">
       Video background 
      <video class="featured-video" autoplay muted loop playsinline>
        <source src="/vid.mp4" type="video/mp4">
      </video>
      
      Overlay for readability 
      <div class="featured-overlay"></div>-->
      
      <!-- Content -->
     <!-- <div class="container featured-content">
        <div v-if="loading" class="status">{{ t('hero.loading') }}</div>
       <div v-else class="cars-grid">
          <CarCard v-for="c in cars" :key="c.id" :car="c" />
        </div>
      </div>
    </section>-->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import CarCard from '../components/CarCard.vue'
import LatestCarsCarousel from '../components/Caruselimitation.vue'
import AnimatedCounter from '../components/AnimatedCounter.vue'
import { useCars } from '../composables/useCars'

const { t } = useI18n()

// Refs for counter components
const carsCounter = ref()
const brandsCounter = ref()
const customersCounter = ref()
const yearsCounter = ref()
const statsRef = ref()

// Intersection observer for stats
const { isIntersecting: isStatsVisible } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
})

watch(isStatsVisible, (newVal) => {
  if (newVal) {
    setTimeout(() => carsCounter.value?.start(), 100)
    setTimeout(() => brandsCounter.value?.start(), 300)
    setTimeout(() => customersCounter.value?.start(), 500)
    setTimeout(() => yearsCounter.value?.start(), 700)
  }
})

const { cars, fetchCars, loading } = useCars()
await fetchCars()

const latestCars = computed(() =>
  [...cars.value].sort((a, b) => b.id - a.id).slice(0, 5)
)
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

/* ========== HERO SECTION ========== */
.hero-section {
  position: relative;
  padding: 120px 20px 80px;
  color: white;
  text-align: center;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Video Background */
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Dark Overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  animation: fadeInUp 0.8s ease;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  margin: 0 0 2.5rem 0;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* ========== FEATURED SECTION ========== */
.featured-section {
  position: relative;
  width: 100%;
  padding: 80px 0;
  overflow: hidden;
  min-height: auto;
}

/* Video Background */
.featured-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Overlay for better text visibility */
.featured-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Content wrapper */
.featured-content {
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin: 0 auto;
}

.status {
  text-align: center;
  padding: 2rem;
  color: #e5e7eb;
  font-size: 1.1rem;
}

/* ========== ANIMATIONS ========== */
@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px) {
  .cars-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px 40px;
    min-height: 50vh;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .featured-section {
    padding: 60px 0;
  }

  .cars-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 16px 24px;
    min-height: 40vh;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .featured-section {
    padding: 40px 0;
  }

  .container {
    padding: 0 1rem;
  }

  .cars-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>