<template>
  <div class="modern-filters">
    <!-- Header -->
    <div class="filters-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke-width="2"/>
        </svg>
      </div>
      <div class="header-text">
        <h3 class="header-title">Ֆիլտրեր</h3>
        <p class="header-subtitle">Ստուգեք ձեր որոնումը</p>
      </div>
    </div>

    <!-- Active Filters Count -->
    <div v-if="activeFiltersCount > 0" class="active-filters-badge">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{{ activeFiltersCount }} ակտիվ ֆիլտր</span>
    </div>

    <!-- Filters Form -->
    <div class="filters-form">
      <!-- Search Filter -->
      <div class="filter-group">
        <label class="filter-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Որոնում</span>
        </label>
        <div class="input-wrapper">
          <input 
            v-model="localFilters.q" 
            @input="emitUpdate" 
            placeholder="Մոդել, տարի..." 
            class="filter-input"
          />
          <button 
            v-if="localFilters.q" 
            @click="clearField('q')" 
            class="clear-field-btn"
            aria-label="Մաքրել"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Make Filter -->
      <div class="filter-group">
        <label class="filter-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 17h14v2H5v-2zm7-11c3.53 0 6.43 2.61 6.92 6H5.08c.49-3.39 3.39-6 6.92-6M19 9c-.5-4.42-4.25-8-9-8S1.5 4.58 1 9h18zm-7 3l-2.5 4h5L12 12z" stroke-width="2"/>
          </svg>
          <span>Արտադրող</span>
        </label>
        <div class="input-wrapper">
          <input 
            v-model="localFilters.make" 
            @input="emitUpdate" 
            placeholder="Toyota, BMW, Mercedes..." 
            class="filter-input"
            list="make-suggestions"
          />
          <datalist id="make-suggestions">
            <option value="Toyota"></option>
            <option value="BMW"></option>
            <option value="Mercedes-Benz"></option>
            <option value="Honda"></option>
            <option value="Hyundai"></option>
            <option value="Ford"></option>
            <option value="Volkswagen"></option>
            <option value="Audi"></option>
            <option value="Lexus"></option>
            <option value="Nissan"></option>
          </datalist>
          <button 
            v-if="localFilters.make" 
            @click="clearField('make')" 
            class="clear-field-btn"
            aria-label="Մաքրել"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Price Range -->
      <div class="filter-group">
        <label class="filter-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Գնային միջակայք</span>
        </label>
        <div class="price-range">
          <div class="price-field">
            <div class="price-label">Նվազագույն</div>
            <div class="input-wrapper">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="localFilters.minPrice" 
                @input="emitUpdate" 
                placeholder="0"
                class="filter-input price-input"
                min="0"
              />
            </div>
          </div>
          
          <div class="price-separator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <div class="price-field">
            <div class="price-label">Առավելագույն</div>
            <div class="input-wrapper">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="localFilters.maxPrice" 
                @input="emitUpdate" 
                placeholder="100000"
                class="filter-input price-input"
                min="0"
              />
            </div>
          </div>
        </div>

        <!-- Quick Price Buttons -->
        <div class="quick-prices">
          <button 
            v-for="range in priceRanges" 
            :key="range.label"
            @click="setQuickPrice(range)"
            class="quick-price-btn"
          >
            {{ range.label }}
          </button>
        </div>
      </div>

      <!-- Additional Filters (Collapsible) -->
      <div class="filter-group">
        <button 
          @click="showAdvanced = !showAdvanced" 
          class="advanced-toggle"
        >
          <span>Լրացուցիչ ֆիլտրեր</span>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            :class="{ rotated: showAdvanced }"
          >
            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <transition name="slide-fade">
          <div v-if="showAdvanced" class="advanced-filters">
            <div class="filter-subgroup">
              <label class="filter-sublabel">Տարեթիվ</label>
              <div class="year-range">
                <input 
                  type="number" 
                  v-model.number="localFilters.minYear"
                  @input="emitUpdate"
                  placeholder="2000"
                  class="filter-input small-input"
                  min="1950"
                  :max="new Date().getFullYear()"
                />
                <span class="range-dash">—</span>
                <input 
                  type="number" 
                  v-model.number="localFilters.maxYear"
                  @input="emitUpdate"
                  :placeholder="new Date().getFullYear()"
                  class="filter-input small-input"
                  min="1950"
                  :max="new Date().getFullYear()"
                />
              </div>
            </div>

            <div class="filter-subgroup">
              <label class="filter-sublabel">Վազք (կմ)</label>
              <input 
                type="number" 
                v-model.number="localFilters.maxMileage"
                @input="emitUpdate"
                placeholder="100000"
                class="filter-input"
                min="0"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="filters-actions">
      <button @click="reset" class="reset-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Մաքրել բոլորը</span>
      </button>

      <button @click="applyFilters" class="apply-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Կիրառել</span>
      </button>
    </div>

    <!-- Results Count Preview -->
    <div class="results-preview">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-width="2"/>
      </svg>
      <span>Գտնված է մոտավորապես <strong>{{ estimatedResults }}</strong> մեքենա</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'

const emits = defineEmits(['update:filters'])
const props = defineProps({
  filters: { 
    type: Object, 
    default: () => ({ 
      q: '', 
      make: '', 
      minPrice: null, 
      maxPrice: null,
      minYear: null,
      maxYear: null,
      maxMileage: null
    }) 
  }
})

const localFilters = reactive({ ...props.filters })
const showAdvanced = ref(false)

// Quick price ranges
const priceRanges = [
  { label: '< $10K', min: 0, max: 10000 },
  { label: '$10K - $20K', min: 10000, max: 20000 },
  { label: '$20K - $50K', min: 20000, max: 50000 },
  { label: '> $50K', min: 50000, max: null }
]

// Computed
const activeFiltersCount = computed(() => {
  let count = 0
  if (localFilters.q) count++
  if (localFilters.make) count++
  if (localFilters.minPrice !== null) count++
  if (localFilters.maxPrice !== null) count++
  if (localFilters.minYear !== null) count++
  if (localFilters.maxYear !== null) count++
  if (localFilters.maxMileage !== null) count++
  return count
})

const estimatedResults = computed(() => {
  // Demo calculation - replace with real logic
  return Math.max(5, 150 - activeFiltersCount.value * 20)
})

// Watch props changes
watch(() => props.filters, (v) => Object.assign(localFilters, v), { deep: true })

// Methods
const emitUpdate = () => {
  emits('update:filters', { ...localFilters })
}

const clearField = (field) => {
  localFilters[field] = field.includes('Price') || field.includes('Year') || field.includes('Mileage') 
    ? null 
    : ''
  emitUpdate()
}

const reset = () => {
  localFilters.q = ''
  localFilters.make = ''
  localFilters.minPrice = null
  localFilters.maxPrice = null
  localFilters.minYear = null
  localFilters.maxYear = null
  localFilters.maxMileage = null
  showAdvanced.value = false
  emitUpdate()
}

const setQuickPrice = (range) => {
  localFilters.minPrice = range.min
  localFilters.maxPrice = range.max
  emitUpdate()
}

const applyFilters = () => {
  emitUpdate()
  // Could add toast notification here
  console.log('Filters applied:', localFilters)
}
</script>

<style scoped>
.modern-filters {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  position: sticky;
  top: 100px;
}

/* ========== Header ========== */
.filters-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f7fafc;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.header-icon svg {
  width: 24px;
  height: 24px;
  color: white;
  stroke-width: 2;
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 4px 0;
  line-height: 1;
}

.header-subtitle {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
}

/* ========== Active Filters Badge ========== */
.active-filters-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
  margin-bottom: 20px;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #667eea30;
  animation: slideIn 0.3s ease;
}

.active-filters-badge svg {
  width: 20px;
  height: 20px;
}

/* ========== Filters Form ========== */
.filters-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  color: #2d3748;
}

.filter-label svg {
  width: 18px;
  height: 18px;
  color: #667eea;
  stroke-width: 2;
}

/* ========== Input Wrapper ========== */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.filter-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 0.95rem;
  color: #2d3748;
  transition: all 0.3s;
  background: #f7fafc;
}

.filter-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-input::placeholder {
  color: #a0aec0;
}

.clear-field-btn {
  position: absolute;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e2e8f0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  padding: 0;
}

.clear-field-btn:hover {
  background: #cbd5e0;
  transform: scale(1.1);
}

.clear-field-btn svg {
  width: 12px;
  height: 12px;
  color: #4a5568;
  stroke-width: 2.5;
}

/* ========== Price Range ========== */
.price-range {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: flex-end;
}

.price-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-label {
  font-size: 0.8rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.currency-symbol {
  position: absolute;
  left: 16px;
  color: #718096;
  font-weight: 600;
  pointer-events: none;
}

.price-input {
  padding-left: 32px;
}

.price-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  padding-bottom: 12px;
}

.price-separator svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

/* ========== Quick Price Buttons ========== */
.quick-prices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.quick-price-btn {
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-price-btn:hover {
  border-color: #667eea;
  color: #667eea;
  background: #667eea05;
}

/* ========== Advanced Filters ========== */
.advanced-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  color: #2d3748;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.advanced-toggle:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.advanced-toggle svg {
  width: 20px;
  height: 20px;
  color: #718096;
  stroke-width: 2;
  transition: transform 0.3s;
}

.advanced-toggle svg.rotated {
  transform: rotate(180deg);
}

.advanced-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
}

.filter-subgroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-sublabel {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 600;
}

.year-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.small-input {
  width: 100%;
}

.range-dash {
  color: #cbd5e0;
  font-weight: 600;
}

/* ========== Actions ========== */
.filters-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #f7fafc;
}

.reset-btn,
.apply-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn {
  background: white;
  color: #718096;
  border: 2px solid #e2e8f0;
}

.reset-btn:hover {
  background: #f7fafc;
  color: #4a5568;
  border-color: #cbd5e0;
}

.apply-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
}

.reset-btn svg,
.apply-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

/* ========== Results Preview ========== */
.results-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #48bb7815 0%, #38a16915 100%);
  border-radius: 12px;
  margin-top: 16px;
  color: #2f855a;
  font-size: 0.9rem;
  border: 1px solid #48bb7830;
}

.results-preview svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  flex-shrink: 0;
}

.results-preview strong {
  font-weight: 800;
}

/* ========== Animations ========== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
  .modern-filters {
    position: static;
    padding: 20px;
  }

  .filters-header {
    padding-bottom: 16px;
  }

  .header-title {
    font-size: 1.25rem;
  }

  .price-range {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .price-separator {
    display: none;
  }

  .quick-prices {
    grid-template-columns: 1fr;
  }

  .filters-actions {
    grid-template-columns: 1fr;
  }
}
</style>