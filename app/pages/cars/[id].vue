<template>
  <div class="car-detail-page">
    <div class="hero-section">
      <div class="hero-content">
        <NuxtLink :to="localePath('/cars')" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ t('carDetail.back') }}</span>
        </NuxtLink>

        <div v-if="isPending" class="loading-container">
          <div class="loading-spinner"></div>
          <p>{{ t('carDetail.loading') }}</p>
        </div>

        <div v-else-if="!car" class="not-found">
          <div class="not-found-icon">❌</div>
          <h2>{{ t('carDetail.notFoundTitle') }}</h2>
          <p>{{ t('carDetail.notFoundDesc') }}</p>
          <NuxtLink :to="localePath('/cars')" class="primary-btn">
            {{ t('carDetail.goCatalog') }}
          </NuxtLink>
        </div>

        <div v-else class="detail-container">
          <div class="gallery-section">
            <div class="main-image-container">
              <img 
                :src="currentImage" 
                :alt="`${normalizeValue(car.make)} ${normalizeValue(car.model)}`"
                class="main-image"
                @click="openLightbox"
              />
              
              <div class="image-badges">
                <div class="year-badge">
                  {{ car.year }}
                </div>
                
                <div class="status-badge" :class="getStatusClass(car.status)" v-if="car.status">
                  <span class="status-text">{{ getStatusText(car.status) }}</span>
                </div>
              </div>

              <button v-if="hasMultipleImages" class="nav-arrow prev" @click.stop="prevImage">
                ‹
              </button>
              <button v-if="hasMultipleImages" class="nav-arrow next" @click.stop="nextImage">
                ›
              </button>

              <div v-if="hasMultipleImages" class="image-counter">
                {{ currentImageIndex + 1 }} / {{ car.images.length }}
              </div>
            </div>

            <div class="thumbnails-row" v-if="hasMultipleImages">
              <div 
                v-for="(img, index) in car.images" 
                :key="index"
                class="thumbnail"
                :class="{ active: currentImageIndex === index }"
                @click="currentImageIndex = index"
              >
                <img 
                  :src="getImageUrl(img.image)" 
                  :alt="`${normalizeValue(car.make)} ${normalizeValue(car.model)} - Image ${index + 1}`"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div class="info-section">
            <div class="glass-card title-card">
              <div class="title-header">
                <h1 class="car-title">
                  <span class="make">{{ normalizeValue(car.make) }}</span>
                  <span class="model">{{ normalizeValue(car.model) }}</span>
                </h1>
                <button class="share-btn" @click="shareProduct">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                  </svg>
                </button>
              </div>

              <div class="price-section">
                <div class="price-label">{{ t('carDetail.priceLabel') }}</div>
                <div class="price-value">{{ formatPrice(car.price) }} $</div>
              </div>

              <div class="quick-specs">
                <div class="quick-spec">
                  <div class="spec-info">
                    <div class="spec-label">{{ t('carDetail.mileage') }}</div>
                    <div class="spec-value">{{ formatMileage(car.mileage) }}</div>
                  </div>
                </div>

                <div class="quick-spec">
                  <div class="spec-info">
                    <div class="spec-label">{{ t('carDetail.color') }}</div>
                    <div class="spec-value">
                      <span class="color-dot" :style="{ backgroundColor: getColorHex(car.color) }"></span>
                      {{ normalizeValue(car.color) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass-card specs-card">
              <h3 class="section-title">
                {{ t('carDetail.specsTitle') }}
              </h3>

              <div class="specs-grid">
                <div class="spec-row">
                  <div class="spec-info">
                    <span class="spec-key">{{ t('carDetail.fuel') }}</span>
                    <span class="spec-val">{{ normalizeValue(car.fuel) }}</span>
                  </div>
                </div>

                <div class="spec-row">
                  <div class="spec-info">
                    <span class="spec-key">{{ t('carDetail.transmission') }}</span>
                    <span class="spec-val">{{ normalizeValue(car.transmission) }}</span>
                  </div>
                </div>

                <div class="spec-row">
                  <div class="spec-info">
                    <span class="spec-key">{{ t('carDetail.year') }}</span>
                    <span class="spec-val">{{ car.year }}</span>
                  </div>
                </div>

                <div class="spec-row">
                  <div class="spec-info">
                    <span class="spec-key">{{ t('carDetail.status') }}</span>
                    <span class="spec-val">{{ getStatusText(car.status) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass-card contact-card">
              <h3 class="section-title">
                {{ t('carDetail.interested') }}
              </h3>

              <div class="contact-buttons">
                <button class="primary-action-btn" @click="contactSeller">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span>{{ t('carDetail.contactSeller') }}</span>
                </button>

                <button class="secondary-action-btn" @click="makeOffer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>{{ t('carDetail.makeOffer') }}</span>
                </button>
              </div>

              <div class="contact-info">
                <div class="info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{{ t('carDetail.safeDeal') }}</span>
                </div>
                <div class="info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{{ t('carDetail.support') }}</span>
                </div>
              </div>
            </div>

            <div class="glass-card description-card">
              <h3 class="section-title">
                {{ t('carDetail.description') }}
              </h3>
              <p class="description-text">{{ car.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
    <button class="close-btn" @click="closeLightbox">
      ✕
    </button>
    
    <div class="lightbox-content">
      <img 
        :src="currentImage" 
        :alt="`${car.make} ${car.model}`"
        class="lightbox-image"
      />
      
      <div class="lightbox-nav">
        <button class="nav-btn prev" @click.stop="prevImage">
          ‹
        </button>
        <div class="image-counter">
          {{ currentImageIndex + 1 }} / {{ car.images.length }}
        </div>
        <button class="nav-btn next" @click.stop="nextImage">
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useLocalePath } from "#imports"
import { useFetch } from "#imports"

const route = useRoute()
const id = route.params.id
const i18nAll = useI18n({ useScope: 'global' })
const { t, locale } = i18nAll
const localePath = useLocalePath()

// State
const currentImageIndex = ref(0)
const lightboxOpen = ref(false)

// ✅ Փոխեք այս տողը - օգտագործեք ձեր backend-ի իրական URL-ը
const { data: car, pending: isPending, refresh } = useFetch(`http://127.0.0.1:8000/api/cars/${id}/`, {
  query: { lang: locale },
  key: `car-${id}-${locale.value}`,
  server: false
})

// Watch for locale changes
watch(locale, () => {
  refresh()
})

// Helper function to extract text from multilingual objects
const extractText = (v, lang) => {
  if (v === null || v === undefined) return ''
  if (typeof v === 'string') return v
  if (Array.isArray(v)) {
    for (const itm of v) {
      const t = extractText(itm, lang)
      if (t) return t
    }
    return ''
  }
  if (typeof v === 'object') {
    // prefer language-specific key
    if (lang && Object.prototype.hasOwnProperty.call(v, lang) && typeof v[lang] === 'string') return v[lang]
    // common candidate keys
    for (const k of ['name', 'label', 'title', 'text', 'content', 'html', 'value']) {
      if (Object.prototype.hasOwnProperty.call(v, k) && typeof v[k] === 'string') return v[k]
    }
    // fallback: recurse into children
    for (const key in v) {
      if (Object.prototype.hasOwnProperty.call(v, key)) {
        const t = extractText(v[key], lang)
        if (t) return t
      }
    }
    return ''
  }
  return String(v)
}

// Computed properties
const hasMultipleImages = computed(() => {
  return car.value?.images && car.value.images.length > 1
})

const currentImage = computed(() => {
  if (!car.value?.images || car.value.images.length === 0) {
    return '/placeholder-car.jpg'
  }
  return getImageUrl(car.value.images[currentImageIndex.value]?.image)
})

// Helper functions
const normalizeValue = (v) => {
  return extractText(v, locale.value)
}

const getImageUrl = (img) => {
  if (!img) return '/placeholder-car.jpg'
  if (typeof img === 'string') {
    // Եթե URL-ը հարաբերական է, ավելացրեք backend-ի հասցեն
    if (img.startsWith('/media/') || img.startsWith('media/')) {
      return `http://127.0.0.1:8000${img.startsWith('/') ? img : '/' + img}`
    }
    return img
  }
  if (img.url) return img.url
  if (img.src) return img.src
  if (img.image) return getImageUrl(img.image)
  return '/placeholder-car.jpg'
}

const formatPrice = (price) => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const formatMileage = (mileage) => {
  if (!mileage) return '0 km'
  return `${new Intl.NumberFormat('en-US').format(mileage)} km`
}

const getColorHex = (colorName) => {
  if (!colorName) return '#667eea'
  const colorMap = {
    'սև': '#1a1a1a',
    'սպիտակ': '#f5f5f5',
    'կարմիր': '#e53e3e',
    'կապույտ': '#3182ce',
    'մոխրագույն': '#718096',
    'արծաթագույն': '#cbd5e0',
    'կանաչ': '#38a169',
    'դեղին': '#ecc94b',
    'black': '#1a1a1a',
    'white': '#f5f5f5',
    'red': '#e53e3e',
    'blue': '#3182ce',
    'gray': '#718096',
    'silver': '#cbd5e0',
    'green': '#38a169',
    'yellow': '#ecc94b'
  }
  const normalized = normalizeValue(colorName)
  return colorMap[normalized?.toLowerCase()] || '#667eea'
}

const getStatusClass = (status) => {
  switch (status) {
    case 'armenia': return 'status-armenia'
    case 'transit': return 'status-transit'
    case 'auction': return 'status-auction'
    default: return ''
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'armenia': return t('carDetail.statusArmenia')
    case 'transit': return t('carDetail.statusTransit')
    case 'auction': return t('carDetail.statusAuction')
    default: return ''
  }
}

// Image navigation
const nextImage = () => {
  if (!hasMultipleImages.value) return
  currentImageIndex.value = (currentImageIndex.value + 1) % car.value.images.length
}

const prevImage = () => {
  if (!hasMultipleImages.value) return
  currentImageIndex.value = (currentImageIndex.value - 1 + car.value.images.length) % car.value.images.length
}

// Lightbox controls
const openLightbox = () => {
  if (hasMultipleImages.value) {
    lightboxOpen.value = true
  }
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

// Actions
const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: `${normalizeValue(car.value.make)} ${normalizeValue(car.value.model)}`,
      text: `Check out this car: ${normalizeValue(car.value.make)} ${normalizeValue(car.value.model)}`,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err))
  } else {
    console.log('Share not supported')
  }
}

const contactSeller = () => {
  console.log('Contact seller')
}

const makeOffer = () => {
  console.log('Make offer')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.car-detail-page {
  position: relative;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-image: url('../../assets/kk.jpg');
}

.car-detail-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}

.hero-section {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.hero-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  color: #2d3748;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  margin-bottom: 20px;
}

.back-button:hover {
  background: white;
  transform: translateX(-4px);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: white;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
  color: white;
  gap: 20px;
  padding: 20px;
}

.not-found h2 {
  font-size: 2rem;
  font-weight: 700;
}

.detail-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.gallery-section {
  position: relative;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #f5f7fa;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;
}

.year-badge {
  padding: 8px 16px;
  background: white;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  color: #2d3748;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-badge {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.status-armenia {
  background: #10b981;
  color: white;
}

.status-transit {
  background: #3b82f6;
  color: white;
}

.status-auction {
  background: #f59e0b;
  color: white;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2d3748;
}

.nav-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow.prev {
  left: 16px;
}

.nav-arrow.next {
  right: 16px;
}

.image-counter {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 5;
}

.thumbnails-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.thumbnail {
  width: 90px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  background: #f0f2f5;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail.active {
  border-color: #667eea;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.glass-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.car-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  line-height: 1.2;
  color: #2d3748;
}

.make {
  color: #718096;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.model {
  color: #2d3748;
}

.share-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #edf2f7;
}

.share-btn svg {
  width: 20px;
  height: 20px;
  stroke: #2d3748;
}

.price-section {
  padding: 20px;
  background: #f7fafc;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
}

.price-label {
  font-size: 0.875rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.price-value {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
}

.quick-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.quick-spec {
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.spec-label {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.spec-value {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 20px 0;
}

.specs-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-row {
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.spec-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-key {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-val {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.primary-action-btn,
.secondary-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.primary-action-btn {
  background: #667eea;
  color: white;
}

.primary-action-btn:hover {
  background: #5568d3;
}

.primary-action-btn svg,
.secondary-action-btn svg {
  width: 20px;
  height: 20px;
}

.secondary-action-btn {
  background: #f7fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.secondary-action-btn:hover {
  background: #edf2f7;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #2d3748;
}

.info-item svg {
  width: 18px;
  height: 18px;
  stroke: #10b981;
  flex-shrink: 0;
}

.description-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
  color: white;
}

.lightbox-nav .image-counter {
  position: static;
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.875rem;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.1);
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
  }

  .main-image-container {
    height: 320px;
  }

  .car-title {
    font-size: 1.5rem;
  }

  .price-value {
    font-size: 1.5rem;
  }

  .thumbnails-row {
    gap: 8px;
  }

  .thumbnail {
    width: 70px;
    height: 55px;
  }

  .lightbox-image {
    max-height: 65vh;
  }
}
</style>