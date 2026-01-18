<template>
  <div class="services-page">
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <span class="header-badge">{{ t('services.badge') }}</span>
          <h1 class="header-title">{{ t('services.title') }}</h1>
          <p class="header-subtitle">{{ t('services.subtitle') }}</p>
        </div>
      </div>
    </section>

    <section class="services-section">
      <div class="container">
        <div class="section-intro">
          <h2>{{ t('services.howTitle') }}</h2>
          <p>{{ t('services.howSubtitle') }}</p>
        </div>

        <div class="service-steps">
          <div 
            v-for="(step, index) in serviceSteps" 
            :key="index" 
            class="step-card"
          >
            <div class="step-header">
              <div class="step-number">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-section">
      <div class="container">
        <div class="benefits-header">
          <h2>{{ t('services.whyTitle') }}</h2>
          <p>{{ t('services.whySubtitle') }}</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2>{{ t('services.ctaTitle') }}</h2>
            <p>{{ t('services.ctaText') }}</p>
            <div class="cta-buttons">
              <a href="tel:+37491234567" class="cta-button primary">
                {{ t('services.ctaCall') }}
              </a>
              <a href="/calculator" class="cta-button secondary">
                {{ t('services.ctaCalc') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const serviceSteps = computed(() => {
  return [
    { title: t('services.stepsDetailed[0].title'), description: t('services.stepsDetailed[0].description') },
    { title: t('services.stepsDetailed[1].title'), description: t('services.stepsDetailed[1].description') },
    { title: t('services.stepsDetailed[2].title'), description: t('services.stepsDetailed[2].description') },
    { title: t('services.stepsDetailed[3].title'), description: t('services.stepsDetailed[3].description') },
    { title: t('services.stepsDetailed[4].title'), description: t('services.stepsDetailed[4].description') },
    { title: t('services.stepsDetailed[5].title'), description: t('services.stepsDetailed[5].description') },
    { title: t('services.stepsDetailed[6].title'), description: t('services.stepsDetailed[6].description') },
    { title: t('services.stepsDetailed[7].title'), description: t('services.stepsDetailed[7].description') },
    { title: t('services.stepsDetailed[8].title'), description: t('services.stepsDetailed[8].description') },
    { title: t('services.stepsDetailed[9].title'), description: t('services.stepsDetailed[9].description') }
  ]
})

const benefits = computed(() => {
  return [
    { title: t('services.benefitsDetailed[0].title'), description: t('services.benefitsDetailed[0].description') },
    { title: t('services.benefitsDetailed[1].title'), description: t('services.benefitsDetailed[1].description') },
    { title: t('services.benefitsDetailed[2].title'), description: t('services.benefitsDetailed[2].description') },
    { title: t('services.benefitsDetailed[3].title'), description: t('services.benefitsDetailed[3].description') },
    { title: t('services.benefitsDetailed[4].title'), description: t('services.benefitsDetailed[4].description') },
    { title: t('services.benefitsDetailed[5].title'), description: t('services.benefitsDetailed[5].description') }
  ]
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.services-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  background: #ffffff;
}

/* Header Section */
.page-header {
  background: #2c3e50;
  padding: 80px 20px;
  text-align: center;
}

.header-content {
  position: relative;
}

.header-badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
}

.header-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Services Section */
.services-section {
  padding: 80px 20px;
  background: #f8f9fa;
}

.section-intro {
  text-align: center;
  margin-bottom: 60px;
}

.section-intro h2 {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
}

.section-intro p {
  font-size: 18px;
  color: #666;
}

.service-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.step-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.step-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #2c3e50;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.step-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.step-content p {
  color: #666;
  line-height: 1.6;
  font-size: 15px;
}

/* Benefits Section */
.benefits-section {
  padding: 80px 20px;
  background: #34495e;
}

.benefits-header {
  text-align: center;
  margin-bottom: 60px;
}

.benefits-header h2 {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
}

.benefits-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.benefit-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.benefit-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.benefit-card p {
  color: #666;
  line-height: 1.6;
  font-size: 15px;
}

/* CTA Section */
.cta-section {
  padding: 80px 20px;
  background: #f8f9fa;
}

.cta-card {
  background: #2c3e50;
  border-radius: 8px;
  padding: 60px 40px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 40px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: white;
  color: #2c3e50;
}

.cta-button.primary:hover {
  background: #f8f9fa;
  transform: translateY(-3px);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    padding: 60px 20px;
  }

  .header-title {
    font-size: 32px;
  }

  .header-subtitle {
    font-size: 16px;
  }

  .services-section,
  .benefits-section,
  .cta-section {
    padding: 60px 20px;
  }

  .section-intro h2,
  .benefits-header h2,
  .cta-content h2 {
    font-size: 28px;
  }

  .service-steps {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: 40px 30px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 28px;
  }

  .step-card {
    padding: 25px;
  }

  .step-number {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
}
</style>