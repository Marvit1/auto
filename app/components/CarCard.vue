<template>
  <article class="modern-car-card">
    <NuxtLink :to="localePath(`/cars/${car.id}`)" class="card-link">
      <!-- Image Container with Overlay Effects -->
      <div class="image-container">
        <div class="image-wrapper">
          <img 
            :src="getMainImage()" 
            :alt="`${car.make} ${car.model}`" 
            class="car-image"
            loading="lazy"
          />
          <!-- Photo counter badge -->
          <div class="photo-count-badge" v-if="hasMultipleImages">
            {{ car.images.length }}
          </div>
          <!-- Gradient Overlay -->
          <div class="image-overlay"></div>
        </div>
        
        <!-- Floating Year Badge -->
        <div class="year-badge">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <span>{{ car.year }}</span>
        </div>

        <!-- Favorite Button -->
       

        <!-- Status Tag - Moved to top right corner -->
        <div class="status-tag" :class="getStatusClass(car.status)" v-if="car.status">
          <span class="status-text">{{ getStatusText(car.status) }}</span>
          <span class="status-icon" v-if="car.status === 'armenia'">🏠</span>
          <span class="status-icon" v-else-if="car.status === 'transit'">🚚</span>
          <span class="status-icon" v-else-if="car.status === 'auction'">🔨</span>
        </div>
      </div>

      <!-- Card Content with Glassmorphism -->
      <div class="card-content">
        <!-- Title Section -->
        <div class="title-section">
          <h3 class="car-title">
            <span class="make">{{ car.make.toUpperCase() }}</span>
            <span class="model">{{ car.model }}</span>
          </h3>
        </div>

        <!-- Specs Grid -->
        <div class="specs-grid">
          <div class="spec-item">
            
            <span>{{ formatMileage(car.mileage) }}</span>
          </div>

          <div class="spec-item">
            
            <span>{{ normalizeValue(car.transmission) }}</span>
          </div>

          <div class="spec-item">
          
            <span>{{ normalizeValue(car.fuel) }}</span>
          </div>

          <div class="spec-item color-spec">
            <div class="color-dot" :style="{ backgroundColor: getColorHex(car.color) }"></div>
            <span>{{ normalizeValue(car.color) }}</span>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="price-label">{{ t('carDetail.priceLabel') }}</div>
<div class="price-value">{{ Math.floor(car.price).toLocaleString('en-US') }}$</div>
        </div>

        <!-- Action Button -->
        <div class="action-section">
          <div class="view-details-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'

const props = defineProps({
  car: { type: Object, required: true }
})

const i18nAll = useI18n({ useScope: 'global' })
const { t, locale } = i18nAll
const localePath = useLocalePath()

const isFavorite = ref(false)

const resolveText = (path) => {
  try {
    if (i18nAll && i18nAll.te && i18nAll.te(path)) return t(path)
    const msg = (i18nAll.getLocaleMessage && i18nAll.getLocaleMessage(locale.value)) || {}
    const parts = path.split('.')
    let cur = msg
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p]
      else { cur = null; break }
    }
    if (cur) return cur
    const en = (i18nAll.getLocaleMessage && i18nAll.getLocaleMessage('en')) || {}
    cur = en
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p]
      else { cur = null; break }
    }
    return cur || path
  } catch (e) {
    return path
  }
}

// Ensure locale messages exist (prefetch when a card is mounted) to avoid showing raw keys like `carDetail.viewDetails`
const ensureLocaleMessages = async (code) => {
  try {
    if (!code) return false
    const msg = (i18nAll.getLocaleMessage && i18nAll.getLocaleMessage(code)) || {}
    if (msg && msg.nav && msg.nav.home) return true

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1500)
    try {
      const res = await fetch(`/locales/${code}.json`, { signal: controller.signal })
      if (res && res.ok) {
        const data = await res.json()
        if (i18nAll.setLocaleMessage) i18nAll.setLocaleMessage(code, data)
        clearTimeout(timeout)
        return true
      }
    } catch (e) {
      // ignore
    } finally {
      clearTimeout(timeout)
    }

    const enMsg = (i18nAll.getLocaleMessage && i18nAll.getLocaleMessage('en')) || {}
    if (enMsg && enMsg.nav && enMsg.nav.home) return true
  } catch (_) {}
  return false
}

onMounted(() => {
  // Prefetch messages for current locale so `resolveText` can fall back properly
  ensureLocaleMessages(locale.value).catch(() => {})
})

watch(locale, (v) => {
  ensureLocaleMessages(v).catch(() => {})
})

const hasMultipleImages = computed(() => {
  return props.car.images && props.car.images.length > 1;
})

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  console.log('Favorite toggled:', props.car.id)
}

const getMainImage = () => {
  if (props.car.images && props.car.images.length > 0) {
    const img = props.car.images[0].image;
    return getImageUrl(img);
  }
  return getImageUrl(props.car.image); // Fallback to the old image field if exists
}

const getImageUrl = (img) => {
  if (!img) return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%236676ea"/><text x="50%" y="50%" fill="white" font-size="24" font-family="Arial, Helvetica, sans-serif" text-anchor="middle" alignment-baseline="middle">No image</text></svg>'
  if (typeof img === 'string' && img.startsWith("http")) return img
  return "http://127.0.0.1:8000/media/" + img
}

const localeMap = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US'
}

const formatPrice = (p) => {
  if (typeof p === "number") {
    return new Intl.NumberFormat(localeMap[locale.value] || 'en-US', {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(p)
  }
  return p
}

const formatMileage = (mileage) => {
  // Օգտագործիր props.car.mileageUnit-ը եթե կա
  let unit = 'miles'; // default
  
  if (props.car.mileageUnit) {
    // Նորմալացրու mileageUnit-ը
    unit = normalizeValue(props.car.mileageUnit);
  } else {
    // Fallback - փորձիր translation-ից վերցնել
    try {
      const translatedUnit = t('carDetail.mileageUnit');
      if (translatedUnit && translatedUnit !== 'carDetail.mileageUnit') {
        unit = translatedUnit;
      }
    } catch (e) {
      // ignore
    }
  }
  
  if (typeof mileage === "number") {
    return `${new Intl.NumberFormat(localeMap[locale.value] || 'en-US').format(mileage)} ${unit}`;
  }
  return `${mileage} ${unit}`;
}

const getColorHex = (colorName) => {
  // Accept both string names and object shapes like { name, code, hex }
  if (!colorName) return '#667eea'
  if (typeof colorName === 'object') {
    if (colorName.hex) return colorName.hex
    colorName = colorName.name || colorName.label || colorName.code || ''
  }
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
  return colorMap[(colorName || '').toLowerCase()] || '#667eea'
}

const getStatusClass = (status) => {
  switch (status) {
    case 'armenia': return 'status-armenia';
    case 'transit': return 'status-transit';
    case 'auction': return 'status-auction';
    default: return '';
  }
};

const normalizeValue = (v) => {
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') return v.name || v.label || v.title || v.code || ''
  return String(v)
}

const getStatusText = (status) => {
  switch (status) {
    case 'armenia': return t('carDetail.statusArmenia');
    case 'transit': return t('carDetail.statusTransit');
    case 'auction': return t('carDetail.statusAuction');
    default: return '';
  }
};
</script>

<style scoped>
.modern-car-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.modern-car-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(102, 126, 234, 0.3);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* ========== Image Section ========== */
.image-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-car-card:hover .car-image {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 30%);
  z-index: 1;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.photo-count-badge {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modern-car-card:hover .image-overlay {
  opacity: 1;
}

/* Year Badge */
.year-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideInLeft 0.5s ease;
}

.year-badge svg {
  width: 16px;
  height: 16px;
  color: #f59e0b;
}

/* Favorite Button */
.favorite-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.5s ease;
  z-index: 2;
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: #ef4444;
}

.favorite-btn:hover svg {
  stroke: white;
  fill: white;
}

.favorite-btn svg {
  width: 20px;
  height: 20px;
  color: #ef4444;
  transition: all 0.3s;
}

/* Status Tag - New Styling */
.status-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 3;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 2px solid white;
  animation: slideIn 0.3s ease-out;
  transition: all 0.3s ease;
}

.status-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.status-text {
  position: relative;
  top: 1px;
}

.status-icon {
  font-size: 1.1em;
  line-height: 1;
}

.status-armenia {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.status-transit {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.status-auction {
  background: linear-gradient(135deg, #f50b0b 0%, #f5320b 100%);
  color: white;
  animation: pulse 2s infinite;
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* ========== Card Content ========== */
.card-content {
  padding: 20px;
  background: white;
}

/* Title Section */
.title-section {
  margin-bottom: 16px;
  padding: 8px 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.car-title {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  line-height: 1.3;
}

.make {
  color: #4a5568;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.model {
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 800;
  display: block;
  line-height: 1.2;
  margin-top: 4px;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Specs Grid */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  font-size: 0.85rem;
  color: #4a5568;
  font-weight: 600;
  transition: all 0.3s;
  border: 1px solid #e2e8f0;
}

.spec-item:hover {
  background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.spec-item svg {
  width: 16px;
  height: 16px;
  color: #667eea;
  stroke-width: 2;
  flex-shrink: 0;
}

.color-spec {
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
  flex-shrink: 0;
}

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    #e2e8f0 20%,
    #e2e8f0 80%,
    transparent
  );
  margin: 16px 0;
}

/* Price Section */
.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.price-label {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Action Section */
.action-section {
  margin-top: 16px;
}

.view-details-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
}

.view-details-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
  transition: transform 0.3s;
}

.modern-car-card:hover .view-details-btn svg {
  transform: translateX(4px);
}

/* ========== Animations ========== */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
}

/* ========== Mobile Responsiveness ========== */
@media (max-width: 768px) {
  .image-wrapper {
    height: 200px;
  }

  .card-content {
    padding: 16px;
  }

  .car-title {
    font-size: 1.1rem;
  }

  .model {
    font-size: 1.1rem;
  }

  .specs-grid {
    gap: 8px;
  }

  .spec-item {
    padding: 8px 10px;
    font-size: 0.8rem;
  }

  .price-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .year-badge {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .favorite-btn {
    width: 40px;
    height: 40px;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}
</style>