<template>
  <footer class="modern-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="brand-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 17h14v2H5v-2zm7-11c3.53 0 6.43 2.61 6.92 6H5.08c.49-3.39 3.39-6 6.92-6M19 9c-.5-4.42-4.25-8-9-8S1.5 4.58 1 9h18zm-7 3l-2.5 4h5L12 12z" fill="currentColor"/>
              </svg>
            </div>
          <div class="brand-text">
            <span class="brand-name">Auto<span class="brand-market">Swift</span></span>
            <span class="brand-tagline">{{ t('footer.tagline') }}</span>
          </div>
          </div>

          <p class="brand-description">
            {{ t('footer.description') }}
          </p>

          <!-- Social Links -->
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3 class="links-title">{{ t('footer.quickLinks') }}</h3>
          <nav class="links-nav">
            <NuxtLink to="/" class="footer-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ t('nav.home') }}
            </NuxtLink>
            <NuxtLink to="/cars" class="footer-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ t('nav.cars') }}
            </NuxtLink>
            <NuxtLink to="/about" class="footer-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ t('nav.about') }}
            </NuxtLink>
            <NuxtLink to="/services" class="footer-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ t('nav.services') }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact Info -->
        <div class="footer-contact-section">
          <h3 class="links-title">{{ t('footer.contact') }}</h3>
          <div class="contact-items">
            <a href="tel:+37493033883" class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-label">{{ t('footer.phone') }}</span>
                <span class="contact-value">+374 93 033 883</span>
              </div>
            </a>

            <a href="mailto:info@automarket.example" class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-label">{{ t('footer.email') }}</span>
                <span class="contact-value">Vardandavtyan478@gmail.com</span>
              </div>
            </a>

            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-width="2"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-label">{{ t('footer.address') }}</span>
                <span class="contact-value">Երևան, Խանզադյան 8/2</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="footer-newsletter">
          <h3 class="links-title">{{ t('footer.newsletter') }}</h3>
          <p class="newsletter-text">
            {{ t('footer.newsletterText') }}
          </p>
          <div class="newsletter-form">
            <input 
              type="email" 
              :placeholder="t('footer.subscribePlaceholder')" 
              class="newsletter-input"
            />
            <button class="newsletter-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span>{{ new Date().getFullYear() }} AutoSwift. {{ t('footer.allRights') }}</span>
          </div>

          <div class="footer-bottom-links">
            <a href="#" class="bottom-link">{{ t('footer.privacy') }}</a>
            <span class="separator">·</span>
            <a href="#" class="bottom-link">{{ t('footer.terms') }}</a>
            <span class="separator">·</span>
            <a href="#" class="bottom-link">{{ t('footer.cookies') }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="footer-decoration">
      <div class="deco-circle deco-1"></div>
      <div class="deco-circle deco-2"></div>
      <div class="deco-circle deco-3"></div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.modern-footer {
  position: relative;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  overflow: hidden;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 64px 24px 24px;
  position: relative;
  z-index: 1;
}

/* ========== Footer Content Grid ========== */
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 48px;
}

/* ========== Brand Section ========== */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.logo-icon svg {
  width: 32px;
  height: 32px;
  color: white;
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

.brand-tagline {
  font-size: 0.85rem;
  color: #a0aec0;
  font-weight: 500;
}

.brand-description {
  color: #cbd5e0;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
}

/* ========== Social Links ========== */
.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.social-link svg {
  width: 20px;
  height: 20px;
  color: white;
}

/* ========== Footer Links ========== */
.links-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 20px 0;
  position: relative;
  padding-bottom: 12px;
}

.links-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.links-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e0;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  padding: 8px 0;
}

.footer-link:hover {
  color: white;
  transform: translateX(4px);
}

.footer-link svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.5;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.footer-link:hover svg {
  opacity: 1;
}

/* ========== Contact Section ========== */
.footer-contact-section {
  display: flex;
  flex-direction: column;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
  color: #667eea;
  stroke-width: 2;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.95rem;
  color: #e2e8f0;
  font-weight: 500;
}

/* ========== Newsletter ========== */
.footer-newsletter {
  display: flex;
  flex-direction: column;
}

.newsletter-text {
  color: #cbd5e0;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.newsletter-input::placeholder {
  color: #a0aec0;
}

.newsletter-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.newsletter-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
}

.newsletter-btn svg {
  width: 20px;
  height: 20px;
  color: white;
  stroke-width: 2;
}

/* ========== Footer Bottom ========== */
.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a0aec0;
  font-size: 0.9rem;
}

.copyright svg {
  width: 18px;
  height: 18px;
  opacity: 0.6;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.bottom-link {
  color: #cbd5e0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.bottom-link:hover {
  color: white;
}

.separator {
  color: #4a5568;
  user-select: none;
}

/* ========== Decorative Elements ========== */
.footer-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

.deco-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.deco-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: 10%;
  animation-delay: 2s;
}

.deco-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: -100px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

/* ========== Responsive Design ========== */
@media (max-width: 1200px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 48px 20px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .brand-logo {
    flex-direction: column;
    align-items: flex-start;
  }

  .social-links {
    width: 100%;
    justify-content: space-between;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-btn {
    width: 100%;
  }
}
</style>