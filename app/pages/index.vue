<template>
  <div class="home-page">
    <!-- Hero Section with Video Background -->
    <section class="hero-section">
      <!-- Video Background -->
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/vid.mp4" type="video/mp4">
      </video>
      
      <!-- Dark Overlay -->
      <div class="hero-overlay"></div>
      
      <!-- Content -->
      <div class="hero-content">
        <h1 class="page-title">{{ t('hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
        
        <!-- Hero Search Bar 
        <div class="hero-search">
          
           Quick Filters 
          <div class="quick-filters">
            <button class="quick-filter">{{ t('hero.quickAbout') }}</button>
            <button class="quick-filter">{{ t('hero.quickServices') }}</button>
            <button class="quick-filter">{{ t('hero.quickCars') }}</button>
            <button class="quick-filter">{{ t('hero.quickHome') }}</button>
          </div> 
        </div>-->
        
         <!-- Quick Stats -->
       
      </div>
    </section>

  

    <!-- Featured Cars Grid - Container Width -->
    <section class="featured-section">
      <div class="container">
        
        <div v-if="loading" class="status">{{ t('hero.loading') }}</div>
        <div v-else class="cars-grid">
          <CarCard v-for="c in cars" :key="c.id" :car="c" />
        </div>
      </div>
    </section>
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

/* Hero Section */
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

/* Hero Search */
.hero-search {
  max-width: 800px;
  margin: 0 auto 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 16px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
}

.search-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.search-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.quick-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
}

.quick-filter {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

/* Quick Stats */
.quick-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: 0.3s;
}

.stat-item {
  text-align: center;
  padding: 0 20px;
  transition: transform 0.3s ease;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
  color: #e5e7eb;
}

/* Carousel Section */
.carousel-section-fullwidth {
  width: 100%;
  margin: 0;
  position: relative;
}

/* Featured Section */
.featured-section {
  width: 100%;
  padding: 60px 0;
  background-image: url('../assets/jj.jpg');
}

.featured-section h2 {
  margin-bottom: 32px;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #2d3748;
  text-align: center;
  position: relative;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  justify-content: center;
  margin: 4px auto 0;
  max-width: 1400px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.status {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px 40px;
  }

  .page-title { 
    font-size: 2.2rem; 
  }

  .hero-subtitle { 
    font-size: 1.1rem; 
  }

  .search-input-group { 
    flex-direction: column; 
  }

  .stat-number { 
    font-size: 2rem; 
  }

  .cars-grid { 
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
    gap: 16px; 
  }
}

@media (max-width: 480px) {
  .hero-section { 
    padding: 30px 16px 24px; 
    min-height: 50vh;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .cars-grid { 
    grid-template-columns: 1fr; 
    gap: 16px; 
  }
}
</style>