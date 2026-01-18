<template>
  <div class="modern-carousel-section">
    <!-- Hero Header with Gradient -->
    <div class="carousel-header">
      <div class="header-content">
        <span class="badge">🔥 Նորություններ</span>
        <h2 class="gradient-title">Վերջին ավելացված մեքենաները</h2>
        <p class="subtitle">Բացահայտեք մեր նորագույն կոլեկցիան</p>
      </div>
      
      <!-- Progress Indicators -->
      <div class="progress-dots">
        <button 
          v-for="(car, idx) in latestCars" 
          :key="car.id"
          @click="goToSlide(idx)"
          :class="['dot', { active: idx === currentIndex }]"
          :aria-label="`Անցնել ${idx + 1} սլայդին`"
        >
          <span class="dot-fill"></span>
        </button>
      </div>
    </div>

    <!-- Carousel Container -->
    <div class="carousel-container">
      <!-- Navigation Buttons -->
      <button 
        class="nav-btn prev" 
        @click="prevSlide"
        aria-label="Նախորդ մեքենա"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Main Carousel Track -->
      <div class="carousel-track">
        <transition-group 
          name="carousel-slide" 
          tag="div" 
          class="slides-wrapper"
        >
          <div 
            v-for="(car, idx) in latestCars"
            v-show="idx === currentIndex"
            :key="car.id"
            class="carousel-slide"
          >
            <!-- Glass Card -->
            <div class="glass-card" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
              <!-- Image Container with Parallax -->
              <div class="image-wrapper">
                <div class="image-bg" :style="{ backgroundImage: `url(${getImageUrl(car.image)})` }"></div>
                <img 
                  :src="getImageUrl(car.image)" 
                  :alt="`${car.make} ${car.model}`"
                  class="car-image"
                  loading="lazy"
                />
                
                <!-- Floating Badge -->
                <div class="year-badge">
                  <span class="year-text">{{ car.year }}</span>
                </div>

                <!-- Gradient Overlay -->
                <div class="gradient-overlay"></div>
              </div>

              <!-- Content Section with Glassmorphism -->
              <div class="card-content">
                <div class="content-inner">
                  <!-- Title Area -->
                  <div class="title-section">
                    <h3 class="car-title">
                      <span class="make">{{ car.make }}</span>
                      <span class="model">{{ car.model }}</span>
                    </h3>
                    
                    <!-- Specs Pills -->
                    <div class="specs-row">
                      <span class="spec-pill">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        Նոր
                      </span>
                      <span class="spec-pill">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3Z"/>
                        </svg>
                        {{ car.year }}
                      </span>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="car-description">
                    {{ car.description.substring(0, 120) }}...
                  </p>

                  <!-- Action Buttons -->
                  <div class="action-buttons">
                    <NuxtLink 
                      :to="`/cars/${car.id}`" 
                      class="primary-btn"
                    >
                      <span>Դիտել մանրամասն</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </NuxtLink>
                    
                    <button class="secondary-btn" @click="toggleFavorite(car.id)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Decorative Elements -->
                <div class="deco-circle deco-1"></div>
                <div class="deco-circle deco-2"></div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <button 
        class="nav-btn next" 
        @click="nextSlide"
        aria-label="Հաջորդ մեքենա"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Thumbnail Preview -->
    <div class="thumbnails-section">
      <div class="thumbnails-track">
        <button
          v-for="(car, idx) in latestCars"
          :key="`thumb-${car.id}`"
          @click="goToSlide(idx)"
          :class="['thumbnail', { active: idx === currentIndex }]"
        >
          <img :src="getImageUrl(car.image)" :alt="car.model" />
          <div class="thumb-overlay">
            <span>{{ car.make }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useCars } from "../composables/useCars"

const { cars, fetchCars, loading } = useCars()
await fetchCars()

const latestCars = computed(() =>
  [...cars.value].sort((a, b) => b.id - a.id).slice(0, 5)
)

const currentIndex = ref(0)
const autoplayInterval = ref<number | null>(null)
const isAutoplayPaused = ref(false)

const currentCar = computed(() => latestCars.value[currentIndex.value])

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + latestCars.value.length) % latestCars.value.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % latestCars.value.length
}

const goToSlide = (idx: number) => {
  currentIndex.value = idx
}

const toggleFavorite = (id: number) => {
  console.log('Favorite toggled:', id)
}

const pauseAutoplay = () => {
  isAutoplayPaused.value = true
}

const resumeAutoplay = () => {
  isAutoplayPaused.value = false
}

const startAutoplay = () => {
  autoplayInterval.value = window.setInterval(() => {
    if (!isAutoplayPaused.value) {
      nextSlide()
    }
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
}

function getImageUrl(img: string | undefined): string {
  if (!img) return "/placeholder-car.jpg"
  if (img.startsWith("http")) return img
  return "http://127.0.0.1:8000/media/" + img
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.modern-carousel-section {
  position: relative;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.modern-carousel-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 50%);
  pointer-events: none;
}

/* ========== Header Section ========== */
.carousel-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.header-content {
  animation: fadeInDown 0.8s ease;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
}

.gradient-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(to right, #fff, #f0f0f0, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 16px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
}

.progress-dots {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.dot {
  width: 40px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.5);
}

.dot.active {
  background: rgba(255, 255, 255, 0.5);
}

.dot.active .dot-fill {
  width: 100%;
}

.dot-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: white;
  transition: width 5s linear;
}

/* ========== Carousel Container ========== */
.carousel-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.carousel-track {
  flex: 1;
  position: relative;
  overflow: visible;
}

.slides-wrapper {
  position: relative;
  min-height: 500px;
}

.carousel-slide {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

/* ========== Glass Card ========== */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.4s, box-shadow 0.4s;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* ========== Image Section ========== */
.image-wrapper {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.image-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: 0.3;
}

.car-image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: transform 0.6s;
}

.glass-card:hover .car-image {
  transform: scale(1.05);
}

.year-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

.year-text {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  z-index: 1;
}

/* ========== Content Section ========== */
.card-content {
  position: relative;
  padding: 32px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.content-inner {
  position: relative;
  z-index: 2;
}

.title-section {
  margin-bottom: 16px;
}

.car-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.make {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.model {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: brightness(1.5);
}

.specs-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.spec-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.spec-pill svg {
  width: 14px;
  height: 14px;
}

.car-description {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  line-height: 1.6;
  margin: 16px 0 24px 0;
}

/* ========== Action Buttons ========== */
.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.primary-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

.secondary-btn {
  padding: 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.secondary-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

/* ========== Decorative Elements ========== */
.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
  animation: float 4s ease-in-out infinite;
}

.deco-1 {
  width: 150px;
  height: 150px;
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.deco-2 {
  width: 100px;
  height: 100px;
  bottom: -30px;
  left: -30px;
  animation-delay: 1s;
}

/* ========== Navigation Buttons ========== */
.nav-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.nav-btn svg {
  width: 28px;
  height: 28px;
  stroke-width: 2.5;
}

/* ========== Thumbnails Section ========== */
.thumbnails-section {
  margin-top: 40px;
  padding: 0 20px;
}

.thumbnails-track {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.thumb-overlay span {
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

.thumbnail:hover .thumb-overlay {
  opacity: 1;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.thumbnail.active {
  border-color: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

/* ========== Animations ========== */
.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.carousel-slide-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.carousel-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.9);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ========== Mobile Responsiveness ========== */
@media (max-width: 768px) {
  .modern-carousel-section {
    padding: 40px 16px;
  }

  .gradient-title {
    font-size: 2rem;
  }

  .carousel-container {
    flex-direction: column;
    gap: 16px;
  }

  .nav-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .nav-btn.prev {
    left: 10px;
  }

  .nav-btn.next {
    right: 10px;
  }

  .image-wrapper {
    height: 280px;
  }

  .card-content {
    padding: 24px;
  }

  .car-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .primary-btn {
    width: 100%;
  }

  .thumbnails-track {
    gap: 12px;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
  }

  .thumbnail {
    width: 100px;
    height: 70px;
    flex-shrink: 0;
  }

  .progress-dots {
    gap: 8px;
  }

  .dot {
    width: 30px;
  }
}

@media (max-width: 480px) {
  .badge {
    font-size: 0.8rem;
    padding: 6px 16px;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .year-badge {
    padding: 8px 16px;
    top: 16px;
    right: 16px;
  }

  .year-text {
    font-size: 0.95rem;
  }

  .spec-pill {
    font-size: 0.75rem;
    padding: 5px 12px;
  }

  .car-description {
    font-size: 0.9rem;
  }
}
</style>