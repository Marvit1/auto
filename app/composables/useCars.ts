// /composables/useCars.ts
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export interface Car {
  id: number
  make: string | object
  model: string | object
  year: number
  price: number | string
  mileage: number
  mileageUnit?: string
  color: string | object
  fuel: string | object
  transmission: string | object
  description: string | object
  status?: string
  image?: string
  images?: { id: number; image: string }[]
}

export const useCars = () => {
  const cars = ref<Car[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const { locale } = useI18n()

  // ✅ HELPER FUNCTION - Multilingual text extraction
  const extractText = (v: any, lang: string): string => {
    if (v === null || v === undefined) return ''
    
    // Already a string
    if (typeof v === 'string') return v
    
    // Array - get first valid text
    if (Array.isArray(v)) {
      for (const itm of v) {
        const t = extractText(itm, lang)
        if (t) return t
      }
      return ''
    }
    
    // Object - try language key first, then common keys
    if (typeof v === 'object') {
      // Prefer language-specific key (e.g., 'hy', 'en', 'ru')
      if (lang && Object.prototype.hasOwnProperty.call(v, lang) && typeof v[lang] === 'string') {
        return v[lang]
      }
      
      // Common candidate keys
      for (const k of ['name', 'label', 'title', 'text', 'content', 'html', 'value']) {
        if (Object.prototype.hasOwnProperty.call(v, k) && typeof v[k] === 'string') {
          return v[k]
        }
      }
      
      // Fallback: recurse into children
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

  // ✅ NORMALIZE CAR DATA
  const normalizeCar = (raw: any, lang: string = 'hy'): Car => {
    return {
      id: raw.id || 0,
      make: raw.make || '',
      model: raw.model || '',
      year: raw.year || new Date().getFullYear(),
      price: raw.price || 0,
      mileage: raw.mileage || 0,
      mileageUnit: raw.mileageUnit || 'miles',
      color: raw.color || '',
      fuel: raw.fuel || '',
      transmission: raw.transmission || '',
      description: raw.description || '',
      status: raw.status || '',
      image: raw.image || (raw.images && raw.images[0]?.image),
      images: raw.images || []
    }
  }

  // ✅ GET NORMALIZED VALUE (for rendering)
  const getNormalizedValue = (v: any): string => {
    return extractText(v, locale.value || 'hy')
  }

  // ✅ FETCH CARS - SSR COMPATIBLE
  const fetchCars = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<Car[]>(
        'https://api.autoswift.shop/api/cars/',
        {
          query: { lang: locale.value || 'hy' },
          timeout: 30000 // 30 second timeout
        }
      )
      
      if (response && Array.isArray(response)) {
        cars.value = response.map(raw => normalizeCar(raw, locale.value || 'hy'))
      }
    } catch (err: any) {
      console.error('Failed to fetch cars:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      cars.value = []
    } finally {
      loading.value = false
    }
  }

  // ✅ WATCH LOCALE CHANGES
  watch(
    () => locale.value,
    (newLocale) => {
      if (newLocale) {
        fetchCars()
      }
    },
    { immediate: false }
  )

  // ✅ COMPUTED: Total cars count
  const totalCars = computed(() => cars.value.length)

  // ✅ COMPUTED: Check if data is ready
  const isReady = computed(() => !loading.value && cars.value.length > 0)

  return {
    cars,
    loading,
    error,
    totalCars,
    isReady,
    fetchCars,
    extractText,
    getNormalizedValue,
    normalizeCar
  }
}