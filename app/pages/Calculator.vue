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
    // COPART
    "COPART AL - TANNER": 2390,
    "COPART AL - MONTGOMERY": 2390,
    "COPART AL - BIRMINGHAM": 2390,
    "COPART AL - MOBILE": 2390,
    "COPART AL - DOTHAN": 2370,
    "COPART AL - MOBILE SOUTH": 2380,
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
    "COPART GA - MACON": 2410,
    "COPART GA - CARTERSVILLE": 2310,
    "COPART GA - TIFTON": 2350,
    "COPART GA - SAVANNAH": 2270,
    "COPART GA - ATLANTA EAST": 2330,
    "COPART GA - ATLANTA NORTH": 2280,
    "COPART GA - ATLANTA SOUTH": 2470,
    "COPART GA - ATLANTA WEST": 2330,
    "COPART GA - FAIRBURN": 2420,
    "COPART GA - AUGUSTA": 2330,
    "COPART TX - WACO": 2430,
    "COPART TX - ANDREWS": 2655,
    "COPART TX - SAN ANTONIO": 2480,
    "COPART TX - DALLAS SOUTH": 2430,
    "COPART TX - AUSTIN": 2430,
    "COPART TX - MCALLEN": 2460,
    "COPART TX - LUFKIN": 2430,
    "COPART TX - LONGVIEW": 2440,
    "COPART TX - HOUSTON": 2330,
    "COPART TX - FT. WORTH": 2470,
    "COPART TX - DALLAS": 2430,
    "COPART TX - CORPUS CHRISTI": 2440,
    "COPART TX - EL PASO": 2655,
    "COPART TX - AMARILLO": 2680,
    "COPART TX - ABILENE": 2530,
    "COPART TX - HOUSTON EAST": 2330,
    "COPART NY - BUFFALO": 2490,
    "COPART NY - NEWBURGH": 2280,
    "COPART NY - ROCHESTER": 2405,
    "COPART NY - SYRACUSE": 2330,
    "COPART NY - LONG ISLAND": 2280,
    "COPART NY - ALBANY": 2305,
    // IAAI
    "IAAI TUCSON (AZ)": 3080,
    "IAAI PHOENIX (AZ)": 3020,
    "IAAI ACE - CARSON (CA)": 2870,
    "IAAI ACE - PERRIS (CA)": 2940,
    "IAAI SAN DIEGO (CA)": 2970,
    "IAAI SACRAMENTO (CA)": 3005,
    "IAAI NORTH HOLLYWOOD (CA)": 2870,
    "IAAI HIGH DESERT (CA)": 2930,
    "IAAI LOS ANGELES (CA)": 2870,
    "IAAI FRESNO (CA)": 2980,
    "IAAI FREMONT (CA)": 3005,
    "IAAI FONTANA (CA)": 2850,
    "IAAI COLTON (CA)": 2840,
    "IAAI EAST BAY (CA)": 3005,
    "IAAI ANAHEIM (CA)": 2830,
    "IAAI LOS ANGELES SOUTH (CA)": 2870,
    "IAAI SANTA CLARITA (CA)": 2880,
    "IAAI RIVERSIDE (CA)": 2860,
    "IAAI STOCKTON (CA)": 3130,
    "IAAI WESTERN COLORADO (CO)": 3210,
    "IAAI DENVER EAST (CO)": 2780,
    "IAAI COLORADO SPRINGS (CO)": 4130,
    "IAAI TAMPA NORTH (FL)": 2280,
    "IAAI ORLANDO-NORTH (FL)": 2230,
    "IAAI MIAMI-NORTH (FL)": 2230,
    "IAAI TAMPA (FL)": 2230,
    "IAAI ORLANDO (FL)": 2230,
    "IAAI PENSACOLA (FL)": 2330,
    "IAAI JACKSONVILLE (FL)": 2230,
    "IAAI FORT PIERCE (FL)": 2180,
    "IAAI CLEARWATER (FL)": 2250,
    "IAAI FORT MYERS (FL)": 2460,
    "IAAI WEST PALM BEACH (FL)": 2280,
    "IAAI MACON (GA)": 2280,
    "IAAI ATLANTA EAST (GA)": 2330,
    "IAAI TIFTON (GA)": 2290,
    "IAAI SAVANNAH (GA)": 2130,
    "IAAI ATLANTA (GA)": 2330,
    "IAAI CHICAGO-NORTH (IL)": 2580,
    "IAAI CHICAGO-SOUTH (IL)": 2580,
    "IAAI CHICAGO-WEST (IL)": 2530,
    "IAAI INDIANAPOLIS (IN)": 2580,
    "IAAI FORT WAYNE (IN)": 2580,
    "IAAI SOUTHERN NEW JERSEY (NJ)": 2230,
    "IAAI CENTRAL NEW JERSEY (NJ)": 2180,
    "IAAI AVENEL NEW JERSEY (NJ)": 2180,
    "IAAI STATEN ISLAND (NY)": 2280,
    "IAAI ALBANY (NY)": 2305,
    "IAAI NEWBURGH (NY)": 2280,
    "IAAI ROCHESTER (NY)": 2405,
    "IAAI LONG ISLAND (NY)": 2280,
    "IAAI SYRACUSE (NY)": 2480,
    "IAAI BUFFALO (NY)": 2480,
    "IAAI HOUSTON SOUTH (TX)": 2380,
    "IAAI FORT WORTH NORTH (TX)": 2470,
    "IAAI HOUSTON-NORTH (TX)": 2380,
    "IAAI DALLAS (TX)": 2430,
    "IAAI SAN ANTONIO-SOUTH (TX)": 2480,
    "IAAI MCALLEN (TX)": 2480,
    "IAAI LUBBOCK (TX)": 2630,
    "IAAI LONGVIEW (TX)": 2470,
    "IAAI HOUSTON (TX)": 2380,
    "IAAI EL PASO (TX)": 2680,
    "IAAI AUSTIN (TX)": 2440,
    "IAAI AMARILLO (TX)": 2680,
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
            <select id="auctionLocation" v-model="values.auctionLocation" class="form-field" style="max-height: 300px; overflow-y: auto;">
              <option value="">{{ t('calculator.select') }}</option>
              
              <!-- COPART LOCATIONS -->
              <optgroup label="Copart - Alabama">
                <option>Copart AL - Tanner</option>
                <option>Copart AL - Montgomery</option>
                <option>Copart AL - Birmingham</option>
                <option>Copart AL - Mobile</option>
                <option>Copart AL - Dothan</option>
                <option>Copart AL - Mobile South</option>
              </optgroup>

              <optgroup label="Copart - Arizona">
                <option>Copart AZ - Tucson</option>
                <option>Copart AZ - Phoenix</option>
                <option>Copart AZ - Phoenix North</option>
              </optgroup>

              <optgroup label="Copart - California">
                <option>Copart CA - Antelope</option>
                <option>Copart CA - Long Beach</option>
                <option>Copart CA - Sun Valley</option>
                <option>Copart CA - Van Nuys</option>
                <option>Copart CA - Vallejo</option>
                <option>Copart CA - San Jose</option>
                <option>Copart CA - San Diego</option>
                <option>Copart CA - Sacramento</option>
                <option>Copart CA - Rancho Cucamonga</option>
                <option>Copart CA - Martinez</option>
                <option>Copart CA - Los Angeles</option>
                <option>Copart CA - Hayward</option>
                <option>Copart CA - Fresno</option>
                <option>Copart CA - San Bernardino</option>
                <option>Copart CA - Bakersfield</option>
                <option>Copart CA - Redding</option>
                <option>Copart CA - Adelanto</option>
                <option>Copart CA - Mentone</option>
                <option>Copart CA - So Sacramento</option>
                <option>Copart CA - Napa</option>
              </optgroup>

              <optgroup label="Copart - Colorado">
                <option>Copart CO - Denver</option>
                <option>Copart CO - Denver South</option>
                <option>Copart CO - Colorado Springs</option>
                <option>Copart CO - Denver Central</option>
              </optgroup>

              <optgroup label="Copart - Connecticut">
                <option>Copart CT - Hartford Springfield</option>
                <option>Copart CT - Hartford</option>
              </optgroup>

              <optgroup label="Copart - Delaware">
                <option>Copart DE - Seaford</option>
              </optgroup>

              <optgroup label="Copart - Florida">
                <option>Copart FL - Orlando North</option>
                <option>Copart FL - Miami Central</option>
                <option>Copart FL - West Palm Beach</option>
                <option>Copart FL - Tampa South</option>
                <option>Copart FL - Miami North</option>
                <option>Copart FL - Orlando South</option>
                <option>Copart FL - Ocala</option>
                <option>Copart FL - Tallahassee</option>
                <option>Copart FL - Miami South</option>
                <option>Copart FL - Ft. Pierce</option>
                <option>Copart FL - Punta Gorda South</option>
                <option>Copart FL - Jacksonville North</option>
              </optgroup>

              <optgroup label="Copart - Georgia">
                <option>Copart GA - Macon</option>
                <option>Copart GA - Cartersville</option>
                <option>Copart GA - Tifton</option>
                <option>Copart GA - Savannah</option>
                <option>Copart GA - Atlanta East</option>
                <option>Copart GA - Atlanta North</option>
                <option>Copart GA - Atlanta South</option>
                <option>Copart GA - Atlanta West</option>
                <option>Copart GA - Fairburn</option>
                <option>Copart GA - Augusta</option>
              </optgroup>

              <optgroup label="Copart - Texas">
                <option>Copart TX - Waco</option>
                <option>Copart TX - Andrews</option>
                <option>Copart TX - San Antonio</option>
                <option>Copart TX - Dallas South</option>
                <option>Copart TX - Austin</option>
                <option>Copart TX - McAllen</option>
                <option>Copart TX - Lufkin</option>
                <option>Copart TX - Longview</option>
                <option>Copart TX - Houston</option>
                <option>Copart TX - Ft. Worth</option>
                <option>Copart TX - Dallas</option>
                <option>Copart TX - Corpus Christi</option>
                <option>Copart TX - El Paso</option>
                <option>Copart TX - Amarillo</option>
                <option>Copart TX - Abilene</option>
                <option>Copart TX - Houston East</option>
              </optgroup>

              <optgroup label="Copart - New York">
                <option>Copart NY - Buffalo</option>
                <option>Copart NY - Newburgh</option>
                <option>Copart NY - Rochester</option>
                <option>Copart NY - Syracuse</option>
                <option>Copart NY - Long Island</option>
                <option>Copart NY - Albany</option>
              </optgroup>

              <!-- IAAI LOCATIONS -->
              <optgroup label="IAAI - Arizona">
                <option>IAAI Tucson (AZ)</option>
                <option>IAAI Phoenix (AZ)</option>
              </optgroup>

              <optgroup label="IAAI - California">
                <option>IAAI ACE - Carson (CA)</option>
                <option>IAAI ACE - Perris (CA)</option>
                <option>IAAI San Diego (CA)</option>
                <option>IAAI Sacramento (CA)</option>
                <option>IAAI North Hollywood (CA)</option>
                <option>IAAI High Desert (CA)</option>
                <option>IAAI Los Angeles (CA)</option>
                <option>IAAI Fresno (CA)</option>
                <option>IAAI Fremont (CA)</option>
                <option>IAAI Fontana (CA)</option>
                <option>IAAI Colton (CA)</option>
                <option>IAAI East Bay (CA)</option>
                <option>IAAI Anaheim (CA)</option>
                <option>IAAI Los Angeles South (CA)</option>
                <option>IAAI Santa Clarita (CA)</option>
                <option>IAAI Riverside (CA)</option>
                <option>IAAI Stockton (CA)</option>
              </optgroup>

              <optgroup label="IAAI - Colorado">
                <option>IAAI Western Colorado (CO)</option>
                <option>IAAI Denver East (CO)</option>
                <option>IAAI Colorado Springs (CO)</option>
              </optgroup>

              <optgroup label="IAAI - Florida">
                <option>IAAI Tampa North (FL)</option>
                <option>IAAI Orlando-North (FL)</option>
                <option>IAAI Miami-North (FL)</option>
                <option>IAAI Tampa (FL)</option>
                <option>IAAI Orlando (FL)</option>
                <option>IAAI Pensacola (FL)</option>
                <option>IAAI Jacksonville (FL)</option>
                <option>IAAI Fort Pierce (FL)</option>
                <option>IAAI Clearwater (FL)</option>
                <option>IAAI Fort Myers (FL)</option>
                <option>IAAI West Palm Beach (FL)</option>
              </optgroup>

              <optgroup label="IAAI - Georgia">
                <option>IAAI Macon (GA)</option>
                <option>IAAI Atlanta East (GA)</option>
                <option>IAAI Tifton (GA)</option>
                <option>IAAI Savannah (GA)</option>
                <option>IAAI Atlanta (GA)</option>
              </optgroup>

              <optgroup label="IAAI - Illinois">
                <option>IAAI Chicago-North (IL)</option>
                <option>IAAI Chicago-South (IL)</option>
                <option>IAAI Chicago-West (IL)</option>
              </optgroup>

              <optgroup label="IAAI - Indiana">
                <option>IAAI Indianapolis (IN)</option>
                <option>IAAI Fort Wayne (IN)</option>
              </optgroup>

              <optgroup label="IAAI - New Jersey">
                <option>IAAI Southern New Jersey (NJ)</option>
                <option>IAAI Central New Jersey (NJ)</option>
                <option>IAAI Avenel New Jersey (NJ)</option>
              </optgroup>

              <optgroup label="IAAI - New York">
                <option>IAAI Staten Island (NY)</option>
                <option>IAAI Albany (NY)</option>
                <option>IAAI Newburgh (NY)</option>
                <option>IAAI Rochester (NY)</option>
                <option>IAAI Long Island (NY)</option>
                <option>IAAI Syracuse (NY)</option>
                <option>IAAI Buffalo (NY)</option>
              </optgroup>

              <optgroup label="IAAI - Texas">
                <option>IAAI Houston South (TX)</option>
                <option>IAAI Fort Worth North (TX)</option>
                <option>IAAI Houston-North (TX)</option>
                <option>IAAI Dallas (TX)</option>
                <option>IAAI San Antonio-South (TX)</option>
                <option>IAAI McAllen (TX)</option>
                <option>IAAI Lubbock (TX)</option>
                <option>IAAI Longview (TX)</option>
                <option>IAAI Houston (TX)</option>
                <option>IAAI El Paso (TX)</option>
                <option>IAAI Austin (TX)</option>
                <option>IAAI Amarillo (TX)</option>
              </optgroup>
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
              <option value="from3to7">3-5 years</option>
              <option value="over7">Over 5 years</option>
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
          
         <!--  <div class="results-breakdown">
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
          </div>-->
          
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
   background-image: url('../assets/kk.jpg');

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