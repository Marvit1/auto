// /composables/useCars.ts
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number | string
  mileage: number
  color: string
  fuel: string
  transmission: string
  description: string
  image?: string
  images?: { id: number; image: string }[]
}

export const useCars = () => {
  const cars = ref<Car[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const { locale } = useI18n()

  const extractText = (v: any, lang: string) => {
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

  const normalizeCar = (raw: any) => {
    const lang = locale.value || 'hy'
    return {
      ...raw,
      make: extractText(raw.make, lang) || raw.make || '',
      model: extractText(raw.model, lang) || raw.model || '',
      description: extractText(raw.description, lang) || raw.description || '',
      color: extractText(raw.color, lang) || raw.color || '',
      fuel: extractText(raw.fuel, lang) || raw.fuel || '',
      transmission: extractText(raw.transmission, lang) || raw.transmission || ''
    }
  }

  const fetchCars = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch<Car[]>('http://127.0.0.1:8000/api/cars/', {
        query: { lang: locale.value }
      })
      if (data.value) cars.value = data.value.map(normalizeCar)
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Re-fetch cars when locale changes to load proper translations.
  watch(locale, () => {
    fetchCars()
  })

  return {
    cars,
    loading,
    error,
    fetchCars
  }
}
