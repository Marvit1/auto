




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
  "Copart AL - Tanner": 2390,
  "Copart AL - Montgomery": 2390,
  "Copart AL - Birmingham": 2390,
  "Copart AL - Mobile": 2390,
  "Copart AL - Dothan": 2370,
  "Copart AL - Mobile South": 2380,
  "Copart AR - Fayetteville": 2645,
  "Copart AR - Little Rock": 2615,
  "Copart AZ - Tucson": 3080,
  "Copart AZ - Phoenix": 3020,
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
  "Copart HI - Honolulu": 5110,
  "Copart IA - Des Moines": 2630,
  "Copart IA - Davenport": 2630,
  "Copart ID - Boise": 3380,
  "Copart IL - Wheeling": 2530,
  "Copart IL - Peoria": 2560,
  "Copart IL - Chicago North": 2530,
  "Copart IL - Chicago South": 2530,
  "Copart IL - Southern Illinois": 2580,
  "Copart IN - Indianapolis": 2555,
  "Copart IN - Fort Wayne": 2530,
  "Copart IN - Cicero": 2630,
  "Copart IN - Dyer": 2580,
  "Copart KS - Wichita": 2700,
  "Copart KS - Kansas City": 2730,
  "Copart KY - Lexington West": 2580,
  "Copart KY - Walton": 2680,
  "Copart KY - Louisville": 2720,
  "Copart KY - Lexington East": 2680,
  "Copart KY - Earlington": 2720,
  "Copart LA - Shreveport": 2500,
  "Copart LA - New Orleans": 2520,
  "Copart LA - Baton Rouge": 2580,
  "Copart MA - West Warren": 2330,
  "Copart MA - North Boston": 2330,
  "Copart MA - South Boston": 2330,
  "Copart MA - Freetown": 2430,
  "Copart DC - Washington DC": 2305,
  "Copart MD - Baltimore": 2305,
  "Copart MD - Baltimore East": 2355,
  "Copart ME - Lyman": 2480,
  "Copart ME - Windham": 2580,
  "Copart MI - Detroit": 2580,
  "Copart MI - Ionia": 2630,
  "Copart MI - Lansing": 2580,
  "Copart MI - Kincheloe": 2955,
  "Copart MI - Flint": 2580,
  "Copart MI - Wayland": 2680,
  "Copart MN - Minneapolis": 2620,
  "Copart MN - St. Cloud": 2605,
  "Copart MO - Sikeston": 2580,
  "Copart MO - Springfield": 2630,
  "Copart MO - Columbia": 2530,
  "Copart MO - St. Louis": 3630,
  "Copart MS - Jackson": 2560,
  "Copart MS - Grenada": 2650,
  "Copart MT - Helena": 2680,
  "Copart MT - Billings": 3480,
  "Copart NC - Mocksville": 2310,
  "Copart NC - Lumberton": 2430,
  "Copart NC - Mebane": 2340,
  "Copart NC - Raleigh": 2410,
  "Copart NC - China Grove": 2375,
  "Copart NC - Concord": 2280,
  "Copart NC - Raleigh North": 2430,
  "Copart NC - Gastonia": 2480,
  "Copart NE - Lincoln": 2705,
  "Copart NH - Candia": 2430,
  "Copart NJ - Trenton": 2190,
  "Copart NJ - Somerville": 2190,
  "Copart NJ - Glassboro East": 2255,
  "Copart NJ - Glassboro West": 2255,
  "Copart NM - Albuquerque": 2930,
  "Copart NV - Reno": 3180,
  "Copart NV - Las Vegas": 3000,
  "Copart NV - Las Vegas West": 3040,
  "Copart NY - Buffalo": 2490,
  "Copart NY - Newburgh": 2280,
  "Copart NY - Rochester": 2405,
  "Copart NY - Syracuse": 2330,
  "Copart NY - Long Island": 2280,
  "Copart NY - Albany": 2305,
  "Copart OH - Dayton": 2480,
  "Copart OH - Cleveland East": 2480,
  "Copart OH - Columbus": 2480,
  "Copart OH - Cleveland West": 2480,
  "Copart OH - Akron": 2430,
  "Copart OK - Tulsa": 2580,
  "Copart OK - Oklahoma City": 2580,
  "Copart OR - Portland South": 3355,
  "Copart OR - Portland North": 3355,
  "Copart OR - Eugene": 3305,
  "Copart PA - Philadelphia East": 2250,
  "Copart PA - York Haven": 2355,
  "Copart PA - Pittsburgh South": 2430,
  "Copart PA - Philadelphia": 2250,
  "Copart PA - Harrisburg": 2355,
  "Copart PA - Pittsburgh North": 2430,
  "Copart PA - Altoona": 2430,
  "Copart PA - Scranton": 2280,
  "Copart PA - Chambersburg": 2405,
  "Copart PA - Pittsburgh West": 2430,
  "Copart RI - Exeter": 2355,
  "Copart SC - North Charleston": 2240,
  "Copart SC - Spartanburg": 2480,
  "Copart SC - Columbia": 2470,
  "Copart TN - Memphis": 2620,
  "Copart TN - Knoxville": 2580,
  "Copart TN - Nashville": 2580,
  "Copart TX - Waco": 2430,
  "Copart TX - Andrews": 2655,
  "Copart TX - San Antonio": 2480,
  "Copart TX - Dallas South": 2430,
  "Copart TX - CrashedToys Dallas": 2400,
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
  "Copart UT - Ogden": 3130,
  "Copart UT - Salt Lake City": 3180,
  "Copart VA - Richmond East": 2430,
  "Copart VA - Fredericksburg": 2430,
  "Copart VA - Richmond": 2380,
  "Copart VA - Hampton": 2430,
  "Copart VA - Danville": 2480,
  "Copart VT - Rutland": 2530,
  "Copart WI - Appleton": 2730,
  "Copart WI - Madison South": 2730,
  "Copart WI - Milwaukee North": 2730,
  "Copart WI - Milwaukee South": 2730,
  "Copart WV - Charleston": 2530,
  "Copart WY - Casper": 3280,
  "Copart AZ - Phoenix North": 3020,
  
  // IAAI Prices
  "IAAI Anchorage (AK)": 5100,
  "IAAI Dothan (AL)": 2380,
  "IAAI Birmingham (AL)": 2410,
  "IAAI Huntsville (AL)": 2390,
  "IAAI Fayetteville (AR)": 2615,
  "IAAI Little Rock (AR)": 2645,
  "IAAI Tucson (AZ)": 3080,
  "IAAI Phoenix (AZ)": 3020,
  "IAAI ACE - Carson (CA)": 2870,
  "IAAI ACE - Perris (CA)": 2940,
  "IAAI ACE - Perris 2 (CA)": 2940,
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
  "IAAI New Castle (DE)": 2280,
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
  "IAAI Atlanta South (GA)": 2330,
  "IAAI Atlanta North (GA)": 2330,
  "IAAI Honolulu (HI)": 5110,
  "IAAI Des Moines (IA)": 2630,
  "IAAI Davenport (IA)": 2605,
  "IAAI Boise (ID)": 3380,
  "IAAI Specialty Division (IL)": 2550,
  "IAAI Lincoln (IL)": 2655,
  "IAAI Chicago-North (IL)": 2580,
  "IAAI Chicago-South (IL)": 2580,
  "IAAI Chicago-West (IL)": 2530,
  "IAAI St. Louis (IL)": 2530,
  "IAAI South Bend (IN)": 2630,
  "IAAI Indianapolis (IN)": 2580,
  "IAAI Indianapolis South (IN)": 2630,
  "IAAI Fort Wayne (IN)": 2580,
  "IAAI Wichita (KS)": 2680,
  "IAAI Kansas City (KS)": 2730,
  "IAAI Paducah (KY)": 2580,
  "IAAI Bowling Green (KY)": 2580,
  "IAAI Ashland (KY)": 2580,
  "IAAI Louisville North (KY)": 2580,
  "IAAI New Orleans East (LA)": 2550,
  "IAAI Shreveport (LA)": 2500,
  "IAAI Lafayette (LA)": 2510,
  "IAAI Baton Rouge (LA)": 2500,
  "IAAI Templeton (MA)": 2380,
  "IAAI Boston - Shirley (MA)": 2330,
  "IAAI Taunton (MA)": 2360,
  "IAAI Dundalk (MD)": 2305,
  "IAAI Metro DC (MD)": 2305,
  "IAAI Baltimore (MD)": 2305,
  "IAAI Elkton (MD)": 2380,
  "IAAI Portland - Gorham (ME)": 2490,
  "IAAI Flint (MI)": 2580,
  "IAAI Grand Rapids (MI)": 2630,
  "IAAI Detroit (MI)": 2580,
  "IAAI Minneapolis/St. Paul (MN)": 2580,
  "IAAI Minneapolis South (MN)": 2630,
  "IAAI Kansas City East (MO)": 3630,
  "IAAI Springfield (MO)": 2505,
  "IAAI Gulf Coast (MS)": 2530,
  "IAAI Jackson (MS)": 2730,
  "IAAI Grenada (MS)": 2650,
  "IAAI Missoula (MT)": 3530,
  "IAAI Billings (MT)": 3480,
  "IAAI Greensboro (NC)": 2395,
  "IAAI Asheville (NC)": 2395,
  "IAAI Concord (NC)": 2455,
  "IAAI Raleigh (NC)": 2525,
  "IAAI Charlotte (NC)": 2330,
  "IAAI Wilmington (NC)": 2360,
  "IAAI High Point (NC)": 2530,
  "IAAI Omaha (NE)": 2680,
  "IAAI Manchester (NH)": 2380,
  "IAAI Southern New Jersey (NJ)": 2230,
  "IAAI Central New Jersey (NJ)": 2180,
  "IAAI Avenel New Jersey (NJ)": 2180,
  "IAAI Englishtown (NJ)": 2175,
  "IAAI Sayreville (NJ)": 2180,
  "IAAI Port Murray (NJ)": 2210,
  "IAAI Albuquerque (NM)": 2930,
  "IAAI Las Vegas (NV)": 3000,
  "IAAI Reno (NV)": 3180,
  "IAAI Staten Island (NY)": 2280,
  "IAAI Albany (NY)": 2305,
  "IAAI Newburgh (NY)": 2280,
  "IAAI Rochester (NY)": 2405,
  "IAAI Long Island (NY)": 2280,
  "IAAI Syracuse (NY)": 2480,
  "IAAI Buffalo (NY)": 2480,
  "IAAI Monticello (NY)": 2330,
  "IAAI Columbus (OH)": 2455,
  "IAAI Cincinnati-South (OH)": 2505,
  "IAAI Cincinnati (OH)": 2455,
  "IAAI Akron-Canton (OH)": 2460,
  "IAAI Dayton (OH)": 2480,
  "IAAI Cleveland (OH)": 2455,
  "IAAI Tulsa (OK)": 2580,
  "IAAI Oklahoma City (OK)": 2580,
  "IAAI Portland West (OR)": 3355,
  "IAAI Portland (OR)": 3330,
  "IAAI Eugene (OR)": 3305,
  "IAAI Portland South (OR)": 3360,
  "IAAI York Springs (PA)": 2330,
  "IAAI Erie (PA)": 2505,
  "IAAI Scranton (PA)": 2280,
  "IAAI Pittsburgh-North (PA)": 2430,
  "IAAI Altoona (PA)": 2430,
  "IAAI Philadelphia (PA)": 2250,
  "IAAI Bridgeport (PA)": 2280,
  "IAAI Pittsburgh (PA)": 2430,
  "IAAI Providence (RI)": 2355,
  "IAAI Lexington (SC)": 2410,
  "IAAI Greenville (SC)": 2330,
  "IAAI Charleston (SC)": 2130,
  "IAAI Nashville (TN)": 2425,
  "IAAI Memphis (TN)": 2480,
  "IAAI Knoxville (TN)": 2380,
  "IAAI Chattanooga (TN)": 2380,
  "IAAI Houston South (TX)": 2380,
  "IAAI Fort Worth North (TX)": 2470,
  "IAAI Permian Basin (TX)": 2530,
  "IAAI Houston-North (TX)": 2380,
  "IAAI Dallas (TX)": 2430,
  "IAAI San Antonio-South (TX)": 2480,
  "IAAI McAllen (TX)": 2480,
  "IAAI Lubbock (TX)": 2630,
  "IAAI Longview (TX)": 2470,
  "IAAI Houston (TX)": 2380,
  "IAAI Dallas/Ft Worth (TX)": 2410,
  "IAAI El Paso (TX)": 2680,
  "IAAI Austin (TX)": 2440,
  "IAAI Corpus Christi (TX)": 2440,
  "IAAI Amarillo (TX)": 2680,
  "IAAI Abilene (TX)": 2530,
  "IAAI Austin North (TX)": 2530,
  "IAAI Salt Lake City (UT)": 3180,
  "IAAI Provo (UT)": 3180,
  "IAAI Suffolk (VA)": 2455,
  "IAAI Tidewater (VA)": 2390,
  "IAAI Pulaski (VA)": 2480,
  "IAAI Northern Virginia (VA)": 2330,
  "IAAI Culpeper (VA)": 2430,
  "IAAI Richmond (VA)": 2380,
  "IAAI Roanoke (VA)": 2430,
  "IAAI Burlington (VT)": 2530,
  "IAAI Milwaukee (WI)": 2730,
  "IAAI Portage (WI)": 2730,
  "IAAI Appleton (WI)": 2730,
  "IAAI Shady Spring (WV)": 2555,
  "IAAI Buckhannon (WV)": 2550,
  "IAAI Casper (WY)": 3450,
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
  
  const total = price + auctionFee + shipping + insurance + broker + customs + vat + ecoTax + brokerService + 2000;
  const totalAMD = total * 400;
  
  result.value = {
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
              <optgroup label="Copart - Alabama">
                <option>Copart AL - Tanner</option>
                <option>Copart AL - Montgomery</option>
                <option>Copart AL - Birmingham</option>
                <option>Copart AL - Mobile</option>
                <option>Copart AL - Dothan</option>
                <option>Copart AL - Mobile South</option>
              </optgroup>
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
          
          <div class="total-section">
            <div class="total-card">
              <div class="total-line">
                <span class="total-label">{{ t('calculator.total') }}</span>
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
  background-image: url('../assets/jj.jpg');
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

.total-amd {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
  
  .total-amd {
    font-size: 1.5rem;
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