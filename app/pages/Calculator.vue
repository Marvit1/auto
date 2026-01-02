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

const { t } = useI18n()

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
    'AL-BIRMINGHAM': 2475,
    'AL-DOTHAN': 2440,
    'AL-HUNTSVILLE': 2580,
    'AL-MOBILE': 2500,
    'AL-MONTGOMERY': 2500,
    'AL-TANNER': 2475,
    'AR-FAYETTEVILLE COPART': 2550,
    'AR-FAYETTEVILLE IAA': 2300,
    'AR-LITTLE ROCK COPART': 2500,
    'AR-LITTLE ROCK IAA': 2450,
    'AZ-PHOENIX': 2960,
    'AZ-TUCSON': 3040,
    'CA-ACE CARSON': 2500,
    'CA-ACE PERRIS': 2730,
    'CA-MANHEIM RIVERSIDE': 2690,
    'CA-ADELANTO': 2810,
    'CA-ANAHEIM': 2660,
    'CA-ANTELOPE': 3010,
    'CA-BAKERSFIELD': 2770,
    'CA-COLTON': 2705,
    'CA-EAST BAY': 3050,
    'CA-FONTANA': 2730,
    'CA-FREMONT': 3050,
    'CA-FRESNO': 2850,
    'CA-HAYWARD': 2500,
    'CA-HAYWARD DESERT VIEW': 3010,
    'CA-HIGH DESERT': 2500,
    'CA-LONG BEACH': 2500,
    'CA-LOS ANGELES': 2770,
    'CA-MARTINEZ': 2970,
    'CA-MENTONE': 2755,
    'CA-NORTH HOLLYWOOD': 2660,
    'CA-RANCHO CUCAMONGA': 2730,
    'CA-RANCHO-DESERT VIEW': 2640,
    'CA-REDDING': 3170,
    'CA-SACRAMENTO': 2500,
    'CA-SACRAMENTO-DESERT VIEW': 2930,
    'CA-SAN BERNARDINO': 2705,
    'CA-SAN DIEGO': 2500,
    'CA-SAN DIEGO-DESERT VIEW': 2730,
    'CA-SAN JOSE': 3050,
    'CA-SANTA PAULA-DESERT VIEW': 2705,
    'CA-SO SACRAMENTO': 2930,
    'CA-SUN VALLEY': 2690,
    'CA-VALLEJO': 3010,
    'CA-VAN NUYS': 2730,
    'CO-COLORADO SPRINGS': 2870,
    'CO-DENVER': 2990,
    'CO-DENVER CENTRAL': 2950,
    'CO-DENVER EAST': 2870,
    'CO-DENVER SOUTH': 2950,
    'CO-WESTERN COLORADO': 3550,
    'CT-HARTFORD': 2500,
    'CT-HARTFORD SPRINGFIELD': 2500,
    'CT-HARTFORD-SOUTH': 2500,
    'DC-WASHINGTON': 2270,
    'DC-MD': 2270,
    'DE-NEW CASTLE': 2200,
    'DE-SEAFORD': 2250,
    'FL-CAT JACKSONVILLE SUB LOT': 2080,
    'FL-CAT ORLANDO BOGGY CREEK': 2100,
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
  const shippingCost = values.value.shipping ? parseFloat(values.value.shipping) : getShippingCostByLocation(values.value.auctionLocation);
  
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
            <label class="form-label" for="price">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="label-icon">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              {{ t('calculator.priceLabel') }}
            </label>
            <input
              type="number"
              id="price"
              v-model="values.price"
              class="form-field"
              placeholder="2500"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label" for="auction">{{ t('auctionLabel') }}</label>
            <select id="auction" v-model="values.auction" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="copart">{{ t('calculator.auctionCopart') }}</option>
              <option value="iaa">{{ t('calculator.auctionIAA') }}</option>
              <option value="manheim">{{ t('calculator.auctionManheim') }}</option>
              <option value="other">{{ t('calculator.auctionOther') }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="auctionLocation">{{ t('calculator.auctionLocation') }}</label>
            <select id="auctionLocation" v-model="values.auctionLocation" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option>AL-BIRMINGHAM</option>
              <option>AL-DOTHAN</option>
              <option>CA-LOS ANGELES</option>
              <option>TX-HOUSTON</option>
              <option>FL-MIAMI</option>
              <option>NY-NEW YORK</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="shipping">{{ t('calculator.shipping') }}</label>
            <input
              type="number"
              id="shipping"
              v-model="values.shipping"
              class="form-field"
              :placeholder="values.shipping || t('calculator.shippingPlaceholder')"
            />
            <p class="form-note">{{ t('calculator.shippingPlaceholder') }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="origin">{{ t('calculator.origin') }}</label>
            <select id="origin" v-model="values.origin" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="eaeu">{{ t('calculator.originEAEU') }}</option>
              <option value="noneaeu">{{ t('calculator.originNonEAEU') }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="engineType">{{ t('calculator.engineType') }}</label>
            <select id="engineType" v-model="values.engineType" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="gasoline">{{ t('calculator.gasoline') }}</option>
              <option value="diesel">{{ t('calculator.diesel') }}</option>
              <option value="electric">{{ t('calculator.electric') }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="age">{{ t('calculator.age') }}</label>
            <select id="age" v-model="values.age" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="under3">{{ t('calculator.under3') }}</option>
              <option value="from3to7">{{ t('calculator.from3to7') }}</option>
              <option value="over7">{{ t('calculator.over7') }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="engineVolume">{{ t('calculator.engineVolume') }}</label>
            <select id="engineVolume" v-model="values.engineVolume" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="1000">1.0L (1000 սմ³)</option>
              <option value="1600">1.6L (1600 սմ³)</option>
              <option value="2000">2.0L (2000 սմ³)</option>
              <option value="2500">2.5L (2500 սմ³)</option>
              <option value="3000">3.0L (3000 սմ³)</option>
              <option value="3500">3.5L (3500 սմ³)</option>
              <option value="5000">5.0L (5000 սմ³)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="carType">{{ t('calculator.carType') }}</label>
            <select id="carType" v-model="values.carType" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="sedan">{{ t('calculator.sedan') }}</option>
              <option value="suv">{{ t('calculator.suv') }}</option>
              <option value="crossover">{{ t('calculator.crossover') }}</option>
              <option value="pickup">{{ t('calculator.pickup') }}</option>
            </select>
          </div>
        </div>

        <button @click="calculate" class="calculate-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="button-icon">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="16" y1="14" x2="16" y2="18"/>
            <path d="M16 10h.01"/>
            <path d="M12 10h.01"/>
            <path d="M8 10h.01"/>
            <path d="M12 14h.01"/>
            <path d="M8 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
          </svg>
          {{ t('calculator.calc') }}
        </button>

        <div v-if="result" class="results-card">
          <h2 class="results-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            {{ t('calculator.result') }}
          </h2>
          
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
          
          <div class="total-section">
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
          
          <div class="note-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="note-icon">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p class="note-text">{{ t('calculator.paymentNote') }}</p>
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
  background-image: url('../assets/ii.jpg');
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.label-icon {
  width: 18px;
  height: 18px;
  color: #667eea;
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
  transform: translateY(-2px);
}

.form-field:hover {
  border-color: #cbd5e1;
}

.form-note {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 6px;
  font-style: italic;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.button-icon {
  width: 24px;
  height: 24px;
}

.calculate-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.calculate-button:active {
  transform: translateY(-1px);
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
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
}

.title-icon {
  width: 32px;
  height: 32px;
  color: #667eea;
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

.total-section {
  margin-top: 24px;
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

.note-box {
  margin-top: 24px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  display: flex;
  align-items: center;
  gap: 12px;
}

.note-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
  flex-shrink: 0;
}

.note-text {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .calculator-wrapper {
    padding: 20px 10px;
  }
  
  .calculator-card {
    padding: 24px;
    border-radius: 16px;
  }
  
  .calculator-title {
    font-size: 1.8rem;
  }
  
  .calculator-subtitle {
    font-size: 1rem;
  }
  
  .input-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .results-card {
    padding: 20px;
  }
  
  .total-usd {
    font-size: 1.5rem;
  }
  
  .total-amd {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .icon-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .car-icon {
    width: 30px;
    height: 30px;
  }
  
  .calculator-title {
    font-size: 1.5rem;
  }
  
  .calculate-button {
    padding: 16px 24px;
    font-size: 1rem;
  }
}
</style>