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
                <div class="price-value">{{ formatPrice(car.price) }} </div>
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


<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useLocalePath, useHead, useSeoMeta, useRuntimeConfig, useFetch } from "#imports"

// 1. Սկզբնական արժեքներ
const defaultImage = 'https://www.autoswift.shop/images/logs.jpg'
const route = useRoute()
const id = route.params.id as string
const i18nAll = useI18n({ useScope: 'global' })
const { t, locale } = i18nAll
const localePath = useLocalePath()
const config = useRuntimeConfig()

// State
const currentImageIndex = ref(0)
const lightboxOpen = ref(false)

// 2. FETCH DATA (Կարևոր է SSR-ի համար՝ await-ով)
const { data: car, pending, error, refresh } = await useFetch<any>(
  () => `https://autback.onrender.com/api/cars/${id}/`,
  {
    query: { lang: locale.value },
    key: `car-detail-${id}-${locale.value}`,
    server: true,
    watch: [locale]
  }
)

// 3. ՁԵՐ ԲՈԼՈՐ ՀԵԼՓԵՐՆԵՐԸ (ԱՆՓՈՓՈԽ)
const extractText = (v: any, lang: string): string => {
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
    if (lang && Object.prototype.hasOwnProperty.call(v, lang) && typeof v[lang] === 'string') {
      return v[lang]
    }
    for (const k of ['name', 'label', 'title', 'text', 'content', 'html', 'value']) {
      if (Object.prototype.hasOwnProperty.call(v, k) && typeof v[k] === 'string') {
        return v[k]
      }
    }
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

const normalizeValue = (v: any): string => {
  return extractText(v, locale.value)
}

const getImageUrl = (img: any): string => {
  if (!img) return defaultImage
  let path = ''
  if (typeof img === 'string') {
    path = img
  } else if (img.url) {
    path = img.url
  } else if (img.src) {
    path = img.src
  } else if (img.image) {
    return getImageUrl(img.image)
  }

  if (!path) return defaultImage
  if (path.startsWith('http')) return path
  const cleanPath = path.startsWith('/') ? path : '/' + path
  return `https://autback.onrender.com${cleanPath}`
}

const formatPrice = (price: number): string => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const formatPriceNum = (price: number): string => {
  if (!price) return '0'
  return Math.floor(price).toString()
}

const formatMileage = (mileage: number): string => {
  if (!mileage) return '0 miles'
  return `${new Intl.NumberFormat('en-US').format(mileage)} miles`
}

const formatMileageNum = (mileage: number): string => {
  if (!mileage) return '0'
  return Math.floor(mileage).toString()
}

const getColorHex = (colorName: any): string => {
  if (!colorName) return '#667eea'
  const colorMap: Record<string, string> = {
    'սև': '#1a1a1a', 'սպիտակ': '#f5f5f5', 'կարմիր': '#e53e3e', 'կապույտ': '#3182ce',
    'մոխրագույն': '#718096', 'արծաղ': '#cbd5e0', 'կանաչ': '#38a169', 'դեղին': '#ecc94b',
    'black': '#1a1a1a', 'white': '#f5f5f5', 'red': '#e53e3e', 'blue': '#3182ce',
    'gray': '#718096', 'silver': '#cbd5e0', 'green': '#38a169', 'yellow': '#ecc94b'
  }
  const normalized = normalizeValue(colorName)
  return colorMap[normalized?.toLowerCase()] || '#667eea'
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'armenia': return 'status-armenia'
    case 'transit': return 'status-transit'
    case 'auction': return 'status-auction'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'armenia': return 'Հայաստանում'
    case 'transit': return 'Տրանզիտ'
    case 'auction': return 'Աճուրդ'
    default: return ''
  }
}

// 4. COMPUTED SEO PROPERTIES
const carTitle = computed(() => {
  if (!car.value) return 'AutoSwift - ավտոմեքենաների խանութ'
  return `${normalizeValue(car.value.make)} ${normalizeValue(car.value.model)} (${car.value.year})`
})

const carDescription = computed(() => {
  if (!car.value) return 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։'
  return `Գինը: $${formatPriceNum(car.value.price)} | Վազք: ${formatMileageNum(car.value.mileage)} մղ | ${normalizeValue(car.value.fuel)} | ${normalizeValue(car.value.transmission)}`
})

const carImage = computed(() => {
  if (car.value?.images && car.value.images.length > 0) {
    return getImageUrl(car.value.images[0].image)
  }
  return defaultImage
})

// 5. SEO META TAGS (SSR FRIENDLY)
useSeoMeta({
  title: carTitle,
  ogTitle: carTitle,
  description: carDescription,
  ogDescription: carDescription,
  ogImage: carImage,
  ogImageSecureUrl: carImage,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogUrl: () => `${config.public.baseUrl}${route.fullPath}`,
  twitterCard: 'summary_large_image',
  twitterTitle: carTitle,
  twitterDescription: carDescription,
  twitterImage: carImage,
})

// 6. IMAGE NAVIGATION & ACTIONS
const hasMultipleImages = computed(() => car.value?.images && car.value.images.length > 1)

const currentImage = computed(() => {
  if (!car.value?.images || car.value.images.length === 0) return defaultImage
  return getImageUrl(car.value.images[currentImageIndex.value]?.image)
})

const nextImage = () => {
  if (!hasMultipleImages.value) return
  currentImageIndex.value = (currentImageIndex.value + 1) % car.value.images.length
}

const prevImage = () => {
  if (!hasMultipleImages.value) return
  currentImageIndex.value = (currentImageIndex.value - 1 + car.value.images.length) % car.value.images.length
}

const openLightbox = () => { if (hasMultipleImages.value) lightboxOpen.value = true }
const closeLightbox = () => { lightboxOpen.value = false }

const shareProduct = () => {
  if (navigator.share && car.value) {
    navigator.share({
      title: carTitle.value,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err))
  }
}

const contactSeller = () => console.log('Contact seller')
const makeOffer = () => console.log('Make offer')

const handleKeyDown = (event: KeyboardEvent) => {
  if (!car.value?.images || car.value.images.length <= 1) return
  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') nextImage()
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') prevImage()
  if (event.key === 'Escape' && lightboxOpen.value) closeLightbox()
}

onMounted(() => { window.addEventListener('keydown', handleKeyDown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeyDown) })
</script>

<style scoped>
 /* ============================================
   DESKTOP VERSION (1200px և բարձր)
   ============================================ */

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
  padding: 40px 20px;
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
  margin-bottom: 30px;
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
  gap: 32px;
}

.gallery-section {
  position: relative;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #f5f7fa;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badges {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;
}

.year-badge {
  padding: 10px 20px;
  background: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.status-badge {
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2d3748;
}

.nav-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.15);
}

.nav-arrow.prev {
  left: 20px;
}

.nav-arrow.next {
  right: 20px;
}

.image-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 18px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 5;
}

.thumbnails-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0;
}

.thumbnail {
  width: 100px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid transparent;
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
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.glass-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.car-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  line-height: 1.2;
  color: #2d3748;
}

.make {
  color: #718096;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.model {
  color: #2d3748;
}

.share-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.share-btn svg {
  width: 22px;
  height: 22px;
  stroke: #2d3748;
}

.price-section {
  padding: 24px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 10px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.price-label {
  font-size: 0.8rem;
  color: #718096;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
}

.price-value {
  font-size: 2.4rem;
  font-weight: 800;
  color: #667eea;
}

.quick-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.quick-spec {
  padding: 18px;
  background: #f7fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.quick-spec:hover {
  border-color: #cbd5e0;
  background: #edf2f7;
}

.spec-label {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;
}

.spec-value {
  font-size: 1.05rem;
  color: #2d3748;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 22px 0;
}

.specs-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.spec-row {
  padding: 18px;
  background: #f7fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.spec-row:hover {
  border-color: #cbd5e0;
}

.spec-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.spec-key {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.spec-val {
  font-size: 1.05rem;
  color: #2d3748;
  font-weight: 700;
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.primary-action-btn,
.secondary-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.primary-action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.primary-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.primary-action-btn:active {
  transform: translateY(0);
}

.primary-action-btn svg,
.secondary-action-btn svg {
  width: 22px;
  height: 22px;
}

.secondary-action-btn {
  background: #f7fafc;
  color: #2d3748;
  border: 2px solid #e2e8f0;
}

.secondary-action-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #2d3748;
  font-weight: 500;
}

.info-item svg {
  width: 20px;
  height: 20px;
  stroke: #10b981;
  flex-shrink: 0;
}

.description-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  color: white;
}

.lightbox-nav .image-counter {
  position: static;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 16px;
  border-radius: 22px;
  font-size: 0.875rem;
}

.nav-btn {
  width: 48px;
  height: 48px;
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
  transform: scale(1.15);
}

/* ============================================
   LARGE TABLET/SMALL DESKTOP (1024px - 1199px)
   ============================================ */

@media (max-width: 1199px) {
  .hero-section {
    padding: 30px 20px;
  }

  .detail-container {
    grid-template-columns: 1fr 0.9fr;
    gap: 28px;
  }

  .main-image-container {
    height: 420px;
  }

  .car-title {
    font-size: 1.8rem;
  }

  .price-value {
    font-size: 2rem;
  }

  .glass-card {
    padding: 24px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .primary-action-btn,
  .secondary-action-btn {
    padding: 16px 20px;
    font-size: 1rem;
  }
}

/* ============================================
   IPAD / STANDARD TABLET (769px - 1023px)
   ============================================ */

@media (max-width: 1023px) {
  .hero-section {
    padding: 28px 20px;
  }

  .detail-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .main-image-container {
    height: 380px;
    margin-bottom: 20px;
  }

  .thumbnails-row {
    gap: 10px;
  }

  .thumbnail {
    width: 90px;
    height: 70px;
  }

  .info-section {
    gap: 20px;
  }

  .car-title {
    font-size: 1.6rem;
  }

  .price-value {
    font-size: 1.8rem;
  }

  .glass-card {
    padding: 22px;
  }

  .section-title {
    font-size: 1.15rem;
  }
}

/* ============================================
   LARGER PHONES (600px - 768px)
   ============================================ */

@media (max-width: 768px) {
  .hero-section {
    padding: 16px;
    min-height: auto;
  }

  .hero-content {
    max-width: 100%;
    width: 100%;
  }

  .back-button {
    padding: 10px 16px;
    font-size: 0.95rem;
    margin-bottom: 20px;
    width: fit-content;
  }

  .main-image-container {
    height: 300px;
    margin-bottom: 16px;
    border-radius: 12px;
  }

  .image-badges {
    top: 12px;
    left: 12px;
    right: 12px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .thumbnails-row {
    gap: 8px;
    padding: 0;
  }

  .thumbnail {
    width: 70px;
    height: 56px;
  }

  .info-section {
    width: 100%;
    gap: 16px;
  }

  .glass-card {
    padding: 18px;
    border-radius: 10px;
  }

  .car-title {
    font-size: 1.4rem;
  }

  .price-value {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }

  .quick-specs {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .contact-buttons {
    gap: 10px;
  }

  .primary-action-btn,
  .secondary-action-btn {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
}

/* ============================================
   MEDIUM PHONES (500px - 599px)
   ============================================ */

@media (max-width: 599px) {
  .hero-section {
    padding: 12px;
    margin: 0;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .hero-content {
    max-width: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .back-button {
    padding: 9px 14px;
    font-size: 0.9rem;
    margin-bottom: 16px;
    width: fit-content;
    display: inline-flex;
  }

  .main-image-container {
    height: 260px;
    margin: 0 0 14px 0;
    border-radius: 10px;
    width: 100%;
  }

  .image-badges {
    top: 10px;
    left: 10px;
    right: 10px;
    gap: 8px;
  }

  .year-badge {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .status-badge {
    padding: 6px 10px;
    font-size: 0.72rem;
  }

  .nav-arrow {
    width: 36px;
    height: 36px;
    font-size: 1.4rem;
  }

  .nav-arrow.prev {
    left: 10px;
  }

  .nav-arrow.next {
    right: 10px;
  }

  .image-counter {
    bottom: 10px;
    padding: 5px 12px;
    font-size: 0.75rem;
  }

  .thumbnails-row {
    gap: 6px;
    margin-bottom: 0;
    padding: 0;
    width: 100%;
  }

  .thumbnail {
    width: 60px;
    height: 48px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .info-section {
    width: 100%;
    padding: 0;
    margin: 0;
    gap: 12px;
  }

  .glass-card {
    padding: 16px;
    border-radius: 10px;
    margin: 0;
    width: 100%;
  }

  .title-header {
    margin-bottom: 12px;
  }

  .car-title {
    font-size: 1.3rem;
    gap: 4px;
  }

  .make {
    font-size: 0.7rem;
  }

  .share-btn {
    width: 36px;
    height: 36px;
  }

  .price-section {
    padding: 16px;
    margin-bottom: 12px;
  }

  .price-label {
    font-size: 0.72rem;
    margin-bottom: 6px;
  }

  .price-value {
    font-size: 1.6rem;
  }

  .quick-specs {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .quick-spec {
    padding: 12px;
  }

  .spec-label {
    font-size: 0.68rem;
  }

  .spec-value {
    font-size: 0.95rem;
  }

  .section-title {
    font-size: 1.05rem;
    margin-bottom: 14px;
  }

  .specs-grid {
    gap: 10px;
  }

  .spec-row {
    padding: 12px;
  }

  .spec-key {
    font-size: 0.68rem;
  }

  .spec-val {
    font-size: 0.95rem;
  }

  .contact-buttons {
    gap: 10px;
    margin-bottom: 14px;
  }

  .primary-action-btn,
  .secondary-action-btn {
    padding: 13px 14px;
    font-size: 0.92rem;
    border-radius: 8px;
  }

  .contact-info {
    gap: 10px;
    padding-top: 10px;
  }

  .info-item {
    font-size: 0.85rem;
  }

  .description-text {
    font-size: 0.93rem;
    line-height: 1.6;
  }

  .lightbox-image {
    max-height: 70vh;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
  }
}

/* ============================================
   SMALL PHONES (400px - 499px)
   ============================================ */

@media (max-width: 499px) {
  .hero-section {
    padding: 10px;
    margin: 0;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .hero-content {
    max-width: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .back-button {
    padding: 8px 12px;
    font-size: 0.85rem;
    margin-bottom: 14px;
    width: fit-content;
  }

  .back-button svg {
    width: 16px;
    height: 16px;
  }

  .main-image-container {
    height: 220px;
    margin: 0 0 12px 0;
    border-radius: 10px;
  }

  .image-badges {
    top: 8px;
    left: 8px;
    right: 8px;
  }

  .year-badge {
    padding: 5px 10px;
    font-size: 0.75rem;
  }

  .status-badge {
    padding: 5px 8px;
    font-size: 0.65rem;
  }

  .nav-arrow {
    width: 34px;
    height: 34px;
    font-size: 1.2rem;
  }

  .image-counter {
    bottom: 8px;
    padding: 4px 10px;
    font-size: 0.7rem;
  }

  .thumbnails-row {
    gap: 5px;
    margin-bottom: 0;
  }

  .thumbnail {
    width: 55px;
    height: 44px;
  }

  .info-section {
    gap: 10px;
  }

  .glass-card {
    padding: 14px;
    border-radius: 9px;
  }

  .title-header {
    margin-bottom: 10px;
  }

  .car-title {
    font-size: 1.2rem;
  }

  .make {
    font-size: 0.65rem;
  }

  .share-btn {
    width: 34px;
    height: 34px;
  }

  .share-btn svg {
    width: 16px;
    height: 16px;
  }

  .price-section {
    padding: 14px;
    margin-bottom: 10px;
  }

  .price-label {
    font-size: 0.68rem;
    margin-bottom: 4px;
  }

  .price-value {
    font-size: 1.4rem;
  }

  .quick-specs {
    gap: 8px;
  }

  .quick-spec {
    padding: 10px;
  }

  .spec-label {
    font-size: 0.65rem;
  }

  .spec-value {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .specs-grid {
    gap: 8px;
  }

  .spec-row {
    padding: 10px;
  }

  .spec-key {
    font-size: 0.65rem;
  }

  .spec-val {
    font-size: 0.9rem;
  }

  .contact-buttons {
    gap: 8px;
    margin-bottom: 12px;
  }

  .primary-action-btn,
  .secondary-action-btn {
    padding: 11px 12px;
    font-size: 0.88rem;
  }

  .contact-info {
    gap: 8px;
    padding-top: 8px;
  }

  .info-item {
    font-size: 0.8rem;
    gap: 6px;
  }

  .info-item svg {
    width: 16px;
    height: 16px;
  }

  .description-text {
    font-size: 0.9rem;
  }

  .lightbox-nav {
    gap: 12px;
  }

  .nav-btn {
    width: 34px;
    height: 34px;
    font-size: 1.2rem;
  }
}

/* ============================================
   TINY PHONES (320px - 399px)
   ============================================ */

@media (max-width: 399px) {
  .hero-section {
    padding: 8px;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .hero-content {
    max-width: 100%;
    padding: 0;
  }

  .back-button {
    padding: 7px 10px;
    font-size: 0.8rem;
    margin-bottom: 12px;
  }

  .main-image-container {
    height: 180px;
    margin-bottom: 10px;
  }

  .image-badges {
    top: 6px;
    left: 6px;
    right: 6px;
  }

  .year-badge {
    padding: 4px 8px;
    font-size: 0.7rem;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  .thumbnails-row {
    gap: 4px;
  }

  .thumbnail {
    width: 50px;
    height: 40px;
  }

  .glass-card {
    padding: 12px;
    margin-bottom: 10px;
  }

  .car-title {
    font-size: 1.1rem;
  }

  .price-value {
    font-size: 1.3rem;
  }

  .section-title {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .spec-row {
    padding: 9px;
  }

  .spec-value {
    font-size: 0.85rem;
  }

  .primary-action-btn,
  .secondary-action-btn {
    padding: 10px 10px;
    font-size: 0.8rem;
  }

  .description-text {
    font-size: 0.85rem;
  }
}

</style>