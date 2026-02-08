<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface FormValues {
  price: string;
  auction: 'copart' | 'iaai' | '';
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

// COPART LOCATIONS
const copartLocations: Record<string, number> = {
  "Copart AL - Tanner": 2390,
  "Copart AL - Montgomery": 2390,
  "Copart AL - Birmingham": 2390,
  "Copart AL - Mobile": 2390,
  "Copart AL - Dothan": 2370,
  "Copart AL - Mobile South": 2380,
  "Copart AZ - Tucson": 3080,
  "Copart AZ - Phoenix": 3020,
  "Copart AZ - Phoenix North": 3020,
  "Copart CA - Antelope": 3055,
  "Copart CA - Long Beach": 2830,
  "Copart CA - Sun Valley": 2830,
  "Copart CA - Van Nuys": 2880,
  "Copart CA - Vallejo": 3005,
  "Copart CA - San Jose": 3005,
  "Copart CA - San Diego": 2970,
  "Copart CA - Sacramento": 3030,
  "Copart CA - Rancho Cucamonga": 2890,
  "Copart CA - Martinez": 3005,
  "Copart CA - Los Angeles": 2880,
  "Copart CA - Hayward": 3030,
  "Copart CA - Fresno": 2980,
  "Copart CA - San Bernardino": 2850,
  "Copart CA - Bakersfield": 2905,
  "Copart CA - Redding": 3165,
  "Copart CA - Adelanto": 2840,
  "Copart CA - Mentone": 2880,
  "Copart CA - So Sacramento": 3030,
  "Copart CA - Napa": 3090,
  "Copart CO - Denver": 2830,
  "Copart CO - Denver South": 2830,
  "Copart CO - Colorado Springs": 2820,
  "Copart CO - Denver Central": 2830,
  "Copart CT - Hartford Springfield": 2355,
  "Copart CT - Hartford": 2280,
  "Copart DE - Seaford": 2355,
  "Copart FL - Orlando North": 2180,
  "Copart FL - Miami Central": 2280,
  "Copart FL - West Palm Beach": 2280,
  "Copart FL - Tampa South": 2280,
  "Copart FL - Miami North": 2280,
  "Copart FL - Orlando South": 2280,
  "Copart FL - Ocala": 2280,
  "Copart FL - Tallahassee": 2480,
  "Copart FL - Miami South": 2280,
  "Copart FL - Ft. Pierce": 2180,
  "Copart FL - Punta Gorda South": 2430,
  "Copart FL - Jacksonville North": 2230,
  "Copart GA - Macon": 2410,
  "Copart GA - Cartersville": 2310,
  "Copart GA - Tifton": 2350,
  "Copart GA - Savannah": 2270,
  "Copart GA - Atlanta East": 2330,
  "Copart GA - Atlanta North": 2280,
  "Copart GA - Atlanta South": 2470,
  "Copart GA - Atlanta West": 2330,
  "Copart GA - Fairburn": 2420,
  "Copart GA - Augusta": 2330,
  "Copart IL - Chicago North": 2580,
  "Copart IL - Chicago South": 2580,
  "Copart IN - Indianapolis": 2580,
  "Copart IN - Fort Wayne": 2580,
  "Copart IA - Des Moines": 2630,
  "Copart LA - New Orleans": 2280,
  "Copart MA - Boston": 2305,
  "Copart MI - Detroit": 2530,
  "Copart MN - Minneapolis": 2680,
  "Copart MS - Jackson": 2350,
  "Copart MO - Kansas City": 2530,
  "Copart MO - St. Louis": 2480,
  "Copart NV - Las Vegas": 3030,
  "Copart NJ - Central": 2230,
  "Copart NJ - South": 2230,
  "Copart NM - Albuquerque": 3080,
  "Copart NY - Buffalo": 2490,
  "Copart NY - Newburgh": 2280,
  "Copart NY - Rochester": 2405,
  "Copart NY - Syracuse": 2330,
  "Copart NY - Long Island": 2280,
  "Copart NY - Albany": 2305,
  "Copart NC - Charlotte": 2330,
  "Copart NC - Raleigh": 2280,
  "Copart OH - Columbus": 2480,
  "Copart OH - Cleveland": 2530,
  "Copart PA - Philadelphia": 2230,
  "Copart PA - Pittsburgh": 2380,
  "Copart SC - Columbia": 2280,
  "Copart TN - Nashville": 2380,
  "Copart TN - Memphis": 2330,
  "Copart TX - Waco": 2430,
  "Copart TX - Andrews": 2655,
  "Copart TX - San Antonio": 2480,
  "Copart TX - Dallas South": 2430,
  "Copart TX - Austin": 2430,
  "Copart TX - McAllen": 2460,
  "Copart TX - Lufkin": 2430,
  "Copart TX - Longview": 2440,
  "Copart TX - Houston": 2330,
  "Copart TX - Ft. Worth": 2470,
  "Copart TX - Dallas": 2430,
  "Copart TX - Corpus Christi": 2440,
  "Copart TX - El Paso": 2655,
  "Copart TX - Amarillo": 2680,
  "Copart TX - Abilene": 2530,
  "Copart TX - Houston East": 2330,
  "Copart UT - Salt Lake City": 3130,
  "Copart VA - Richmond": 2280,
  "Copart WA - Seattle": 3155,
  "Copart WI - Milwaukee": 2630,
};

// IAAI LOCATIONS
const iaaiLocations: Record<string, number> = {
  "IAAI Tucson (AZ)": 3080,
  "IAAI Phoenix (AZ)": 3020,
  "IAAI ACE - Carson (CA)": 2870,
  "IAAI ACE - Perris (CA)": 2940,
  "IAAI San Diego (CA)": 2970,
  "IAAI Sacramento (CA)": 3005,
  "IAAI North Hollywood (CA)": 2870,
  "IAAI High Desert (CA)": 2930,
  "IAAI Los Angeles (CA)": 2870,
  "IAAI Fresno (CA)": 2980,
  "IAAI Fremont (CA)": 3005,
  "IAAI Fontana (CA)": 2850,
  "IAAI Colton (CA)": 2840,
  "IAAI East Bay (CA)": 3005,
  "IAAI Anaheim (CA)": 2830,
  "IAAI Los Angeles South (CA)": 2870,
  "IAAI Santa Clarita (CA)": 2880,
  "IAAI Riverside (CA)": 2860,
  "IAAI Stockton (CA)": 3130,
  "IAAI Western Colorado (CO)": 3210,
  "IAAI Denver East (CO)": 2780,
  "IAAI Colorado Springs (CO)": 4130,
  "IAAI Hartford (CT)": 2280,
  "IAAI Seaford (DE)": 2355,
  "IAAI Tampa North (FL)": 2280,
  "IAAI Orlando-North (FL)": 2230,
  "IAAI Miami-North (FL)": 2230,
  "IAAI Tampa (FL)": 2230,
  "IAAI Orlando (FL)": 2230,
  "IAAI Pensacola (FL)": 2330,
  "IAAI Jacksonville (FL)": 2230,
  "IAAI Fort Pierce (FL)": 2180,
  "IAAI Clearwater (FL)": 2250,
  "IAAI Fort Myers (FL)": 2460,
  "IAAI West Palm Beach (FL)": 2280,
  "IAAI Macon (GA)": 2280,
  "IAAI Atlanta East (GA)": 2330,
  "IAAI Tifton (GA)": 2290,
  "IAAI Savannah (GA)": 2130,
  "IAAI Atlanta (GA)": 2330,
  "IAAI Chicago-North (IL)": 2580,
  "IAAI Chicago-South (IL)": 2580,
  "IAAI Chicago-West (IL)": 2530,
  "IAAI Indianapolis (IN)": 2580,
  "IAAI Fort Wayne (IN)": 2580,
  "IAAI Des Moines (IA)": 2630,
  "IAAI New Orleans (LA)": 2280,
  "IAAI Boston (MA)": 2305,
  "IAAI Detroit (MI)": 2530,
  "IAAI Minneapolis (MN)": 2680,
  "IAAI Jackson (MS)": 2350,
  "IAAI Kansas City (MO)": 2530,
  "IAAI St. Louis (MO)": 2480,
  "IAAI Las Vegas (NV)": 3030,
  "IAAI Southern New Jersey (NJ)": 2230,
  "IAAI Central New Jersey (NJ)": 2180,
  "IAAI Avenel New Jersey (NJ)": 2180,
  "IAAI Albuquerque (NM)": 3080,
  "IAAI Staten Island (NY)": 2280,
  "IAAI Albany (NY)": 2305,
  "IAAI Newburgh (NY)": 2280,
  "IAAI Rochester (NY)": 2405,
  "IAAI Long Island (NY)": 2280,
  "IAAI Syracuse (NY)": 2480,
  "IAAI Buffalo (NY)": 2480,
  "IAAI Charlotte (NC)": 2330,
  "IAAI Raleigh (NC)": 2280,
  "IAAI Columbus (OH)": 2480,
  "IAAI Cleveland (OH)": 2530,
  "IAAI Philadelphia (PA)": 2230,
  "IAAI Pittsburgh (PA)": 2380,
  "IAAI Columbia (SC)": 2280,
  "IAAI Nashville (TN)": 2380,
  "IAAI Memphis (TN)": 2330,
  "IAAI Houston South (TX)": 2380,
  "IAAI Fort Worth North (TX)": 2470,
  "IAAI Houston-North (TX)": 2380,
  "IAAI Dallas (TX)": 2430,
  "IAAI San Antonio-South (TX)": 2480,
  "IAAI McAllen (TX)": 2480,
  "IAAI Lubbock (TX)": 2630,
  "IAAI Longview (TX)": 2470,
  "IAAI Houston (TX)": 2380,
  "IAAI El Paso (TX)": 2680,
  "IAAI Austin (TX)": 2440,
  "IAAI Amarillo (TX)": 2680,
  "IAAI Salt Lake City (UT)": 3130,
  "IAAI Richmond (VA)": 2280,
  "IAAI Seattle (WA)": 3155,
  "IAAI Milwaukee (WI)": 2630,
};

const portToGumriCost = 350;

const availableLocations = computed(() => {
  if (values.value.auction === 'copart') {
    return Object.keys(copartLocations).sort();
  } else if (values.value.auction === 'iaai') {
    return Object.keys(iaaiLocations).sort();
  }
  return [];
});

const getShippingCost = (location: string): number => {
  if (values.value.auction === 'copart') {
    return (copartLocations[location] || 2500) + portToGumriCost;
  } else if (values.value.auction === 'iaai') {
    return (iaaiLocations[location] || 2500) + portToGumriCost;
  }
  return 2500 + portToGumriCost;
};

watch(() => values.value.auctionLocation, (newLocation) => {
  if (newLocation) {
    const autoShippingCost = getShippingCost(newLocation);
    values.value.shipping = autoShippingCost.toString();
  }
});

watch(() => values.value.auction, () => {
  values.value.auctionLocation = '';
  values.value.shipping = '';
});

const calculate = () => {
  const price = parseFloat(values.value.price) || 0;
  const shippingCost = values.value.shipping 
    ? parseFloat(values.value.shipping) 
    : getShippingCost(values.value.auctionLocation);
  
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
  
  const total = price + auctionFee + shipping + insurance + broker + customs + vat + ecoTax + brokerService + 1050;
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
            <label class="form-label" for="auction">{{ t('calculator.auctionLabel') }}</label>
            <select id="auction" v-model="values.auction" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="copart">Copart</option>
              <option value="iaai">IAAI</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="auctionLocation">{{ t('calculator.auctionLocation') }}</label>
            <select id="auctionLocation" v-model="values.auctionLocation" class="form-field" :disabled="!values.auction" style="max-height: 300px; overflow-y: auto;">
              <option value="">{{ t('calculator.select') }}</option>
              <option v-for="loc in availableLocations" :key="loc" :value="loc">
                {{ loc }}
              </option>
            </select>
          </div>

          
          
        <!-- <div class="form-group">
            <label class="form-label" for="shipping">{{ t('calculator.shipping') }}</label>
            <input type="number" id="shipping" v-model="values.shipping" class="form-field" placeholder="Auto-calculated" readonly />
          </div>-->
          
         <!-- <div class="form-group">
            <label class="form-label" for="origin">{{ t('calculator.origin') }}</label>
            <select id="origin" v-model="values.origin" class="form-field">
              <option value="">{{ t('calculator.select') }}</option>
              <option value="eaeu">{{ t('calculator.eaeu') }}</option>
              <option value="noneaeu">{{ t('calculator.noneaeu') }}</option>
            </select>
          </div>-->
          
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
              <option value="1000">1.0L (1000cc)</option>
              <option value="1600">1.6L (1600cc)</option>
              <option value="2000">2.0L (2000cc)</option>
              <option value="2500">2.5L (2500cc)</option>
              <option value="3000">3.0L (3000cc)</option>
              <option value="3500">3.5L (3500cc)</option>
              <option value="4000">4.0L (4000cc)</option>
              <option value="4500">4.5L (4500cc)</option>
              <option value="5000">5.0L (5000cc)</option>
              <option value="6000">6.0L (6000cc)</option>
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
          {{ t('calculator.calc') }}
        </button>

        <div v-if="result" class="results-card">
          <h2 class="results-title">{{ t('calculator.result') }}</h2>
          
         <!-- <div class="results-breakdown">
            <div class="result-item">
              <span class="item-label">{{ t('calculator.carPrice') }}</span>
              <span class="item-value">${{ (parseFloat(values.price) || 0).toFixed(2) }}</span>
            </div>-->
           <!-- <div class="result-item">
              <span class="item-label">{{ t('calculator.auctionFee') }}</span>
              <span class="item-value">${{ result.auctionFee.toFixed(2) }}</span>
            </div>-->
           <!-- <div class="result-item">
              <span class="item-label">{{ t('calculator.shippingFee') }}</span>
              <span class="item-value">${{ result.shipping.toFixed(2) }}</span>
            </div>-->
           <!-- <div class="result-item">
              <span class="item-label">{{ t('calculator.insurance') }}</span>
              <span class="item-value">${{ result.insurance.toFixed(2) }}</span>
            </div>-->
           <!-- <div class="result-item">
              <span class="item-label">{{ t('calculator.broker') }}</span>
              <span class="item-value">${{ result.broker.toFixed(2) }}</span>
            </div>-->
            <!--<div class="result-item">
              <span class="item-label">{{ t('calculator.customs') }}</span>
              <span class="item-value">${{ result.customs.toFixed(2) }}</span>
            </div>-->
           <!-- <div class="result-item">
              <span class="item-label">{{ t('calculator.vat') }}</span>
              <span class="item-value">${{ result.vat.toFixed(2) }}</span>
            </div>-->
            <!--<div class="result-item">
              <span class="item-label">{{ t('calculator.ecoTax') }}</span>
              <span class="item-value">${{ result.ecoTax.toFixed(2) }}</span>
            </div>-->
           <!--<div class="result-item">
              <span class="item-label">{{ t('calculator.brokerService') }}</span>
              <span class="item-value">${{ result.brokerService.toFixed(2) }}</span>
            </div>
          </div>-->
          
          <div class="total-card">
            <div class="total-line">
              <span class="total-label">{{ t('calculator.total') }}</span>
              <div class="total-values">
                <div class="total-usd">${{ result.total.toFixed(2) }}</div>
               <!-- <div class="total-amd">{{ result.totalAMD.toLocaleString() }} ֏</div>-->

              
        
              </div>
            </div>
             
          </div>
          <br/>
        <div class="warning-banner">
          <p class="warning-text">
            ⚠️ Կայքում համապատասխան հաշվիչի միջոցով հնարավոր կլինի միայն խիստ մոտավոր պատկերացում կազմել տվյալ տրանսպորտային միջոցի ներմուծման համար գանձման ենթակա մաքսային վճարների վերաբերյալ։
          </p>
          <p class="warning-text">⚠️ Using the appropriate calculator on the website, it will only be possible to get a very rough idea of ​​the customs fees to be charged for the import of a given vehicle.</p>
          <p class="warning-text">⚠️ Используя соответствующий калькулятор на сайте, можно будет получить лишь очень приблизительное представление о таможенных пошлинах, взимаемых за ввоз конкретного транспортного средства.</p>
          
        </div>
           
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================
   GLOBAL SAFETY
========================= */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* =========================
   WRAPPER
========================= */
.calculator-wrapper {
  min-height: 100vh;
  background-image: url('../assets/kk.jpg');
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.calculator-container {
  max-width: 900px;
  margin: 0 auto;
}

/* =========================
   CARD
========================= */
.calculator-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

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

/* =========================
   HEADER
========================= */
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

/* =========================
   WARNING
========================= */
.warning-banner {
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  margin: 8px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;
}

.warning-text {
  color: #92400e;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 4px;
  font-weight: 500;
}

/* =========================
   INPUTS
========================= */
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

.form-field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

/* =========================
   BUTTON
========================= */
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

/* =========================
   RESULTS
========================= */
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

/* 🔥 FIX FLEX OVERFLOW */
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  gap: 12px;
  flex-wrap: wrap;
}

.item-label,
.item-value {
  max-width: 100%;
  word-break: break-word;
  white-space: normal;
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

/* =========================
   TOTAL
========================= */
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
  flex-wrap: wrap;
  gap: 12px;
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
  max-width: 100%;
}

.total-usd,
.total-amd {
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
  line-height: 1.2;
}

.total-usd {
  font-size: 2rem;
  font-weight: 900;
  color: white;
}

.total-amd {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
}

/* =========================
   MOBILE
========================= */
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

@media (max-width: 480px) {
  .total-line {
    flex-direction: column;
    align-items: flex-start;
  }

  .total-values {
    text-align: left;
    width: 100%;
  }
}
</style>
