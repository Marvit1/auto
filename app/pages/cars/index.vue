<template>
  <div class="cars-page">
    <h1 class="page-title">{{ t('cars.title') }}</h1>
    <div class="main-grid">
      <section class="cars-section">
        <div v-if="loading" class="status">{{ t('cars.loading') }}</div>
        <div v-else>
          <div class="cars-grid">
            <CarCard v-for="c in filteredCars" :key="c.id" :car="c" />
          </div>
          <div v-if="filteredCars.length === 0" class="no-results">
            {{ t('cars.noResults') }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CarCard from '../../components/CarCard.vue'
import { useCars } from '../../composables/useCars'

const { t, locale } = useI18n()
const { cars, loading, fetchCars } = useCars()
await fetchCars()

const route = useRoute()
const q = route.query.q || ''

const filters = reactive({
  q: q,
  minPrice: null,
  maxPrice: null,
  make: ''
})

// Helper function to extract text from multilingual fields
const extractText = (v) => {
  if (v === null || v === undefined) return ''
  if (typeof v === 'string') return v
  if (Array.isArray(v)) {
    for (const itm of v) {
      const t = extractText(itm)
      if (t) return t
    }
    return ''
  }
  if (typeof v === 'object') {
    const lang = locale.value || 'hy'
    // Try language-specific key first
    if (v[lang] && typeof v[lang] === 'string') return v[lang]
    // Try common keys
    for (const k of ['name', 'label', 'title', 'text', 'content', 'value']) {
      if (v[k] && typeof v[k] === 'string') return v[k]
    }
    // Fallback: recurse into nested objects
    for (const key in v) {
      if (Object.prototype.hasOwnProperty.call(v, key)) {
        const t = extractText(v[key])
        if (t) return t
      }
    }
    return ''
  }
  return String(v)
}

// Helper to get numeric price
const getNumericPrice = (price) => {
  if (typeof price === 'number') return price
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.]/g, ''))
    return isNaN(num) ? 0 : num
  }
  return 0
}

const filteredCars = computed(() => {
  if (!cars.value) return []
  
  return cars.value.filter(car => {
    // Extract text values for filtering
    const make = extractText(car.make).toLowerCase()
    const model = extractText(car.model).toLowerCase()
    const year = car.year ? String(car.year) : ''
    const price = getNumericPrice(car.price)
    
    // Search query filter
    const searchStr = `${make} ${model} ${year}`.toLowerCase()
    const matchesQ = !filters.q || searchStr.includes(String(filters.q).toLowerCase())
    
    // Make filter
    const matchesMake = !filters.make || make === filters.make.toLowerCase()
    
    // Price filters
    const matchesMin = !filters.minPrice || price >= Number(filters.minPrice)
    const matchesMax = !filters.maxPrice || price <= Number(filters.maxPrice)
    
    return matchesQ && matchesMake && matchesMin && matchesMax
  })
})
</script>

<style scoped>
.cars-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #2d3748;
}

.main-grid {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.cars-section {
  flex: 3;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.filters-section {
  flex: 1;
  min-width: 220px;
}

.filters-card {
  padding: 14px;
}

.status {
  font-size: 1rem;
  color: #718096;
  text-align: center;
  padding: 40px;
}

.no-results {
  margin-top: 18px;
  color: #718096;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

@media (max-width: 992px) {
  .main-grid {
    flex-direction: column;
  }

  .filters-section {
    min-width: 100%;
  }
  
  .cars-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 640px) {
  .cars-page {
    padding: 12px;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .cars-grid {
    grid-template-columns: 1fr;
  }
}
</style>