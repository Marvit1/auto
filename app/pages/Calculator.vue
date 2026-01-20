<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

interface FormValues {
  price: string;
  auction: string;
  auctionLocation: string;
  shipping: string;
  origin: 'eaeu' | 'noneaeu' | '';
  engineType: 'gasoline' | 'diesel' | 'electric' | '';
  age: 'under3' | 'from3to7' | 'over7' | '';
  engineVolume: string;
  carType: string;
}

interface CalculationResult {
  auctionFee: number;
  shipping: number;
  insurance: number;
  broker: number;
  customs: number;
  vat: number;
  ecoTax: number;
  brokerService: number;
  total: number;
  totalAMD: number;
}

const { t } = useI18n();

const values = ref<FormValues>({
  price: '',
  auction: '',
  auctionLocation: '',
  shipping: '',
  origin: '',
  engineType: '',
  age: '',
  engineVolume: '',
  carType: ''
});

const result = ref<CalculationResult | null>(null);

const getShippingCostByLocation = (location: string): number => {
  const norm = location
    .toUpperCase()
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .replace(/-\s+/g, '-')
    .replace(/\s+-/g, '-')
    .trim();

  const prices: Record<string, number> = {
    "COPART AL - TANNER": 2390,
    "COPART AL - MONTGOMERY": 2390,
    "COPART AL - BIRMINGHAM": 2390,
    "COPART AL - MOBILE": 2390,
    "COPART AL - DOTHAN": 2370,
    "COPART AL - MOBILE SOUTH": 2380,
    "COPART AR - FAYETTEVILLE": 2645,
    "COPART AR - LITTLE ROCK": 2615,
    "COPART AZ - TUCSON": 3080,
    "COPART AZ - PHOENIX": 3020,
    "COPART AZ - PHOENIX NORTH": 3020,
    "COPART CA - ANTELOPE": 3055,
    "COPART CA - LONG BEACH": 2830,
    "COPART CA - SUN VALLEY": 2830,
    "COPART CA - VAN NUYS": 2880,
    "COPART CA - VALLEJO": 3005,
    "COPART CA - SAN JOSE": 3005,
    "COPART CA - SAN DIEGO": 2970,
    "COPART CA - SACRAMENTO": 3030,
    "COPART CA - RANCHO CUCAMONGA": 2890,
    "COPART CA - MARTINEZ": 3005,
    "COPART CA - LOS ANGELES": 2880,
    "COPART CA - HAYWARD": 3030,
    "COPART CA - FRESNO": 2980,
    "COPART CA - SAN BERNARDINO": 2850,
    "COPART CA - BAKERSFIELD": 2905,
    "COPART CA - REDDING": 3165,
    "COPART CA - ADELANTO": 2840,
    "COPART CA - MENTONE": 2880,
    "COPART CA - SO SACRAMENTO": 3030,
    "COPART CA - NAPA": 3090,
    "COPART CO - DENVER": 2830,
    "COPART CO - DENVER SOUTH": 2830,
    "COPART CO - COLORADO SPRINGS": 2820,
    "COPART CO - DENVER CENTRAL": 2830,
    "COPART CT - HARTFORD SPRINGFIELD": 2355,
    "COPART CT - HARTFORD": 2280,
    "COPART DE - SEAFORD": 2355,
    "COPART FL - ORLANDO NORTH": 2180,
    "COPART FL - MIAMI CENTRAL": 2280,
    "COPART FL - WEST PALM BEACH": 2280,
    "COPART FL - TAMPA SOUTH": 2280,
    "COPART FL - MIAMI NORTH": 2280,
    "COPART FL - ORLANDO SOUTH": 2280,
    "COPART FL - OCALA": 2280,
    "COPART FL - TALLAHASSEE": 2480,
    "COPART FL - MIAMI SOUTH": 2280,
    "COPART FL - FT. PIERCE": 2180,
    "COPART FL - PUNTA GORDA SOUTH": 2430,
    "COPART FL - JACKSONVILLE NORTH": 2230,
    "IAAI PHOENIX (AZ)": 3020,
    "IAAI LOS ANGELES (CA)": 2870,
    "IAAI HOUSTON (TX)": 2380,
    "IAAI NEW YORK (NY)": 2280,
    "IAAI MIAMI (FL)": 2230,
  };

  return prices[norm] ?? 2500;
};

watch(() => values.value.auctionLocation, (newLocation) => {
  if (newLocation) {
    const autoShippingCost = getShippingCostByLocation(newLocation);
    values.value.shipping = autoShippingCost.toString();
  }
});

const calculate = () => {
  const price = parseFloat(values.value.price) || 0;
  const shippingCost = values.value.shipping 
    ? parseFloat(values.value.shipping) 
    : getShippingCostByLocation(values.value.auctionLocation);
  
  let auctionFee = 0;
  if (price > 0) {
    if (price <= 1000) {
      auctionFee = 480;
    } else {
      const extra = Math.ceil((price - 1000) / 200);
      auctionFee = 480 + extra * 20;
    }
  }

  const shipping = shippingCost;
  const insurance = price * 0.01;
  const broker = 300;
  const brokerService = 75;
  
  let customsRate = 0;
  const isEAEU = values.value.origin === 'eaeu';
  if (!isEAEU) {
    const engineVolume = parseFloat(values.value.engineVolume) || 0;
    if (values.value.age === 'under3') {
      customsRate = 0.10;
    } else if (values.value.age === 'from3to7') {
      customsRate = 0.15;
    } else if (values.value.age === 'over7') {
      customsRate = engineVolume > 3000 ? 0.25 : 0.20;
    } else {
      customsRate = 0.15;
    }
  }
  
  const customs = price * customsRate;
  
  const engineVolume = parseFloat(values.value.engineVolume) || 0;
  let ecoTax = 0;
  if (engineVolume > 0) {
    if (engineVolume <= 1500) ecoTax = 50;
    else if (engineVolume <= 2000) ecoTax = 100;
    else if (engineVolume <= 3000) ecoTax = 200;
    else ecoTax = 300;
  }

  const vatBase = price + shipping + insurance + customs + ecoTax;
  const vat = vatBase * 0.20;
  
  const total = price + auctionFee + shipping + insurance + broker + customs + vat + ecoTax + brokerService;
  const totalAMD = total * 400;
  
  result.value = {
    auctionFee,
    shipping,
    insurance,
    broker,
    customs,
    vat,
    ecoTax,
    brokerService,
    total,
    totalAMD
  };
};
</script>

<template>
  <div class="calculator-wrapper">
    <div class="calculator-container">
      <div class="calculator-card">
        <div class="header-section">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="car-icon">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
          <h1 class="calculator-title">{{ t('calculator.title') }}</h1>
          <p class="calculator-subtitle">{{ t('calculator.subtitle') }}</p>
        </div>
        
        <div class="input-grid">
          <div class="form-group">
            <label class="form-label" for="price">{{ t('calculator.priceLabel') }}</label>
            <input type="number" id="price" v-model="values.price" class="form-field" placeholder="2500" />
          </div>
          
          <div class="form-group">
            <label class="form-label" for="auction">{{ t('auctionLabel') }}</label>
            <select id="auction" v-model="values.auction" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="copart">Copart</option>
              <option value="iaa">IAA</option>
              <option value="manheim">Manheim</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="auctionLocation">{{ t('calculator.auctionLocation') }}</label>
            <select id="auctionLocation" v-model="values.auctionLocation" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option>Copart AL - Tanner</option>
              <option>Copart AZ - Phoenix</option>
              <option>Copart CA - Los Angeles</option>
              <option>Copart FL - Miami Central</option>
              <option>Copart TX - Houston</option>
              <option>IAAI Phoenix (AZ)</option>
              <option>IAAI Los Angeles (CA)</option>
              <option>IAAI Houston (TX)</option>
              <option>IAAI New York (NY)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="shipping">{{ t('calculator.shipping') }}</label>
            <input type="number" id="shipping" v-model="values.shipping" class="form-field" placeholder="Auto-calculated" />
          </div>
          
          <div class="form-group">
            <label class="form-label" for="engineType">{{ t('calculator.engineType') }}</label>
            <select id="engineType" v-model="values.engineType" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="age">{{ t('calculator.age') }}</label>
            <select id="age" v-model="values.age" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="under3">Under 3 years</option>
              <option value="from3to7">3-7 years</option>
              <option value="over7">Over 7 years</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="engineVolume">{{ t('calculator.engineVolume') }}</label>
            <select id="engineVolume" v-model="values.engineVolume" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="1000">1.0L (1000cc)</option>
              <option value="1600">1.6L (1600cc)</option>
              <option value="2000">2.0L (2000cc)</option>
              <option value="2500">2.5L (2500cc)</option>
              <option value="3000">3.0L (3000cc)</option>
              <option value="3500">3.5L (3500cc)</option>
              <option value="5000">5.0L (5000cc)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="carType">{{ t('calculator.carType') }}</label>
            <select id="carType" v-model="values.carType" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="crossover">Crossover</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
        </div>

        <button @click="calculate" class="calculate-button">
          {{ t('calculator.calc') }}
        </button>

        <div v-if="result" class="results-card">
          <h2 class="results-title">{{ t('calculator.result') }}</h2>
          
          <div class="results-breakdown">
            <div class="result-item">
              <span class="item-label">{{ t('calculator.carPrice') }}</span>
              <span class="item-value">${{ (parseFloat(values.price) || 0).toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.auctionFee') }}</span>
              <span class="item-value">${{ result.auctionFee.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.shippingFee') }}</span>
              <span class="item-value">${{ result.shipping.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.insurance') }}</span>
              <span class="item-value">${{ result.insurance.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.broker') }}</span>
              <span class="item-value">${{ result.broker.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.customs') }}</span>
              <span class="item-value">${{ result.customs.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.vat') }}</span>
              <span class="item-value">${{ result.vat.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.ecoTax') }}</span>
              <span class="item-value">${{ result.ecoTax.toFixed(2) }}</span>
            </div>
            <div class="result-item">
              <span class="item-label">{{ t('calculator.brokerService') }}</span>
              <span class="item-value">${{ result.brokerService.toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="total-card">
            <div class="total-line">
              <span class="total-label">{{ t('calculator.total') }}</span>
              <div class="total-values">
                <div class="total-usd">${{ result.total.toFixed(2) }}</div>
                <div class="total-amd">{{ result.totalAMD.toLocaleString() }} ֏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.calculator-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.calculator-container {
  max-width: 900px;
  margin: 0 auto;
}

.calculator-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.car-icon {
  width: 40px;
  height: 40px;
  color: white;
}

.calculator-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.calculator-subtitle {
  color: #6b7280;
  font-size: 1.1rem;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-field {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
}

.form-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-field:hover {
  border-color: #cbd5e1;
}

.calculate-button {
  width: 100%;
  padding: 18px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.calculate-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.results-card {
  margin-top: 40px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.results-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
}

.results-breakdown {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
}

.result-item:last-child {
  border-bottom: none;
}

.item-label {
  color: #6b7280;
  font-size: 1rem;
}

.item-value {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1f2937;
}

.total-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.total-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.total-values {
  text-align: right;
}

.total-usd {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.total-amd {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
}

@media (max-width: 768px) {
  .calculator-card {
    padding: 24px;
  }
  
  .calculator-title {
    font-size: 1.8rem;
  }
  
  .input-grid {
    grid-template-columns: 1fr;
  }
  
  .total-usd {
    font-size: 1.5rem;
  }
}
</style>