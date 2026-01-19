<template>
  <header class="classic-header" :class="{ scrolled: isScrolled }">




    <div class="header-container">
      <!-- Logo Section 
      <NuxtLink to="/" class="logo-section">
        
        
        
      </NuxtLink>-->
      <NuxtLink to="/">
      <div class="brand-text">
            <span class="brand-name">Auto<span class="brand-market">Swift</span></span>
          </div>
</NuxtLink>
      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <NuxtLink :to="localePath('/')" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke-width="2"/>
          </svg>
          <span>{{ t('nav.home') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/about')" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('nav.about') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/services')" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('nav.services') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/cars')" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 17h14v2H5v-2zm7-11c3.53 0 6.43 2.61 6.92 6H5.08c.49-3.39 3.39-6 6.92-6M19 9c-.5-4.42-4.25-8-9-8S1.5 4.58 1 9h18zm-7 3l-2.5 4h5L12 12z" stroke-width="2"/>
          </svg>
          <span>{{ t('nav.cars') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/calculator')" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2"/>
            <path d="M8 6h8M8 10h8M8 14h8M8 18h8" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ t('nav.calculator') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/CallToAction')" class="nav-link nav-link-cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" 
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('nav.call') }}</span>
        </NuxtLink>
      </nav>

      <!-- Language Switcher -->
      <div class="lang-switcher" v-if="!isChangingLocale">
        <button 
          v-for="opt in locales" 
          :key="opt.code" 
          @click="handleLangChange(opt.code)"
          :class="['lang-btn', { active: opt.code === locale }]"
          :title="opt.name"
        >
          <span class="flag-emoji">{{ flagFor(opt.code) }}</span>
        </button>
      </div>
      <div v-else class="lang-loading">
        <div class="spinner"></div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
        <span class="menu-line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="menu-line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="menu-line" :class="{ open: isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <NuxtLink :to="localePath('/')" class="mobile-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke-width="2"/>
            </svg>
            <span>{{ t('nav.home') }}</span>
          </NuxtLink>

          <NuxtLink :to="localePath('/about')" class="mobile-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ t('nav.about') }}</span>
          </NuxtLink>

          <NuxtLink :to="localePath('/services')" class="mobile-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ t('nav.services') }}</span>
          </NuxtLink>

          <NuxtLink :to="localePath('/cars')" class="mobile-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 17h14v2H5v-2zm7-11c3.53 0 6.43 2.61 6.92 6H5.08c.49-3.39 3.39-6 6.92-6M19 9c-.5-4.42-4.25-8-9-8S1.5 4.58 1 9h18zm-7 3l-2.5 4h5L12 12z" stroke-width="2"/>
            </svg>
            <span>{{ t('nav.cars') }}</span>
          </NuxtLink>

          <NuxtLink :to="localePath('/calculator')" class="mobile-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2"/>
              <path d="M8 6h8M8 10h8M8 14h8M8 18h8" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ t('nav.calculator') }}</span>
          </NuxtLink>

          <NuxtLink :to="localePath('/CallToAction')" class="mobile-link mobile-link-cta" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" 
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ t('nav.call') }}</span>
          </NuxtLink>
        </nav>

        <div class="mobile-lang" v-if="!isChangingLocale">
          <button 
            v-for="opt in locales" 
            :key="opt.code" 
            @click="handleLangChange(opt.code)"
            :class="['mobile-lang-btn', { active: opt.code === locale }]"
          >
            <span class="flag-emoji">{{ flagFor(opt.code) }}</span>
            <span>{{ opt.name }}</span>
          </button>
        </div>
        <div v-else class="mobile-lang-loading">
          <div class="spinner"></div>
          <span>Բեռնում...</span>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalePath, useSwitchLocalePath } from '#imports'

const router = useRouter()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const i18n = useI18n({ useScope: 'global' })
const { locale, t, availableLocales } = i18n
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const locales = computed(() => availableLocales.map(code => ({
  code,
  name: t(`language.${code}`)
})))

const isChangingLocale = ref(false)
const flagMap = { hy: '🇦🇲', ru: '🇷🇺', en: '🇺🇸' }
const flagFor = (code) => flagMap[code] || '🏳️'

// Պարզեցված և հուսալի լեզվի փոփոխման մեխանիզմ
const handleLangChange = async (code) => {
  if (!code || code === locale.value || isChangingLocale.value) return
  
  isChangingLocale.value = true
  
  try {
    // Փակում ենք mobile menu-ն եթե բաց է
    if (isMobileMenuOpen.value) {
      closeMobileMenu()
    }
    
    // Պահպանում ենք cookie-ում
    document.cookie = `i18n_redirected=${code};path=/;max-age=${60 * 60 * 24 * 365}`
    
    // Ստանում ենք նոր path-ը
    const newPath = switchLocalePath(code)
    
    // Եթե path-ը գոյություն ունի, անցնում ենք դեպի այն
    if (newPath) {
      // Full page reload՝ ապահովելու համար բոլոր ռեսուրսների ճիշտ բեռնումը
      window.location.href = newPath
    } else {
      // Fallback - ստեղծում ենք path-ը ձեռքով
      const currentPath = router.currentRoute.value.path
      const pathWithoutLocale = currentPath.replace(/^\/(hy|ru|en)/, '') || '/'
      window.location.href = `/${code}${pathWithoutLocale}`
    }
    
  } catch (error) {
    console.error('Language change error:', error)
    // Վերջնական fallback - գնում ենք home էջ
    window.location.href = `/${code}`
  } finally {
    // Reset անում ենք 3 վայրկյանից, բայց page reload-ը սովորաբար կկատարվի շատ ավելի շուտ
    setTimeout(() => {
      isChangingLocale.value = false
    }, 3000)
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.classic-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3548 100%);
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.classic-header.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

/* Logo */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  width: 72px;        /* փոխիր ըստ կարիքի */
  height: 72px;

  background-image: url('../assets/logs.jpg');
  background-size: contain;   /* լոգոն ամբողջությամբ երևա */
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;

  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.logo-section:hover {
  transform: translateY(-2px);
}

.logo-icon {
  width: 46px;
  height: 46px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  transition: all 0.3s ease;
}

.logo-section:hover .logo-icon {
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
  transform: scale(1.05);
}

.logo-icon svg {
  width: 26px;
  height: 26px;
  color: #ffffff;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo-sub {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #4a90e2;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link.router-link-active {
  background: rgba(74, 144, 226, 0.2);
  color: #4a90e2;
}

.nav-link.router-link-active::before {
  width: 80%;
}

.nav-link-cta {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: #ffffff !important;
  margin-left: 8px;
  box-shadow: 0 3px 10px rgba(74, 144, 226, 0.3);
}

.nav-link-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.nav-link-cta::before {
  display: none;
}

.nav-link svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

/* Language Switcher */
.lang-switcher {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.lang-btn.active {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  box-shadow: 0 3px 8px rgba(74, 144, 226, 0.3);
  transform: scale(1.05);
}

.flag-emoji {
  font-size: 24px;
  line-height: 1;
  display: block;
}

.lang-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #4a90e2;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  gap: 5px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.menu-line {
  width: 24px;
  height: 2.5px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-line.open:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}

.menu-line.open:nth-child(2) {
  opacity: 0;
}

.menu-line.open:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 75px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3548 100%);
  overflow-y: auto;
  padding: 20px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-link:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.mobile-link.router-link-active {
  background: rgba(74, 144, 226, 0.2);
  color: #4a90e2;
  border-color: rgba(74, 144, 226, 0.3);
}

.mobile-link svg {
  width: 22px;
  height: 22px;
  stroke-width: 2;
  flex-shrink: 0;
}

.mobile-link-cta {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: #ffffff !important;
  margin-top: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.mobile-link-cta:active {
  background: linear-gradient(135deg, #357abd 0%, #2868a8 100%);
}

/* Mobile Language */
.mobile-lang {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-lang-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-lang-btn:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.mobile-lang-btn.active {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.mobile-lang-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 30px;
  color: rgba(255, 255, 255, 0.7);
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
}

.brand-market {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive */
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .lang-switcher {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0 16px;
    height: 65px;
  }

  .logo-icon {
    width: 42px;
    height: 42px;
  }

  .logo-icon svg {
    width: 24px;
    height: 24px;
  }

  .logo-main {
    font-size: 1.3rem;
  }

  .logo-sub {
    font-size: 0.65rem;
  }

  .mobile-menu {
    top: 65px;
    padding: 16px;
  }

  .mobile-link {
    padding: 14px 16px;
    font-size: 0.95rem;
  }

  .mobile-link svg {
    width: 20px;
    height: 20px;
  }

 

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
}

.brand-market {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
}

@media (max-width: 400px) {
  .logo-text {
    display: none;
  }
}
</style>