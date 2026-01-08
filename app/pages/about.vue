<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">{{ t('about.badge') }}</span>
          <p class="hero-subtitle">{{ t('about.subtitle') }}</p>
        </div>
      </div>
    </section>
<section class="team-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">{{ t('about.teamBadge') }}</span>
          <h2>{{ t('about.teamTitle') }}</h2>
          <p>{{ t('about.teamSubtitle') }}</p>
        </div>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img src="../assets/Vrd.jfif" 
     alt="Վարդան Դավթյան" 
     class="team-photo" 
     
     />
     
              <div class="">
                
              </div>
            </div>
            <div class="member-info">
              <h3>{{ t('about.vardaName') }}</h3>
              <p class="member-role">{{ t('about.vardaRole') }}</p>
              <div class="member-contacts">
                <a href="tel:+37493033883" class="contact-link">
                  📞 +374 93 033 883
                </a>
                <a href="Vardandavtyan478@gmail.com" class="contact-link">
                 ✉️ Vardandavtyan478@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div class="team-member">
            <div class="member-image">
<img src="../assets/Art.jfif" 
     alt="Արտակ Ոսկանյան" 
     class="team-photo" 
   
     />              <div class="image-placeholder">
               
              </div>
            </div>
            <div class="member-info">
              <h3>{{ t('about.artakName') }}</h3>
              <p class="member-role">{{ t('about.artakRole') }}</p>
              <div class="member-contacts">
                <a href="tel:+37455692222" class="contact-link">
                  📞 +374 55 692 222
                </a>
                <a href="" class="contact-link">
                 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <span class="section-badge">{{ t('about.whyBadge') }}</span>
            <h2>{{ t('about.whyTitle') }}</h2>
            <p>{{ t('about.whyText') }}</p>
            
            <div class="features">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div>
                  <h4>{{ t('about.featExperience') }}</h4>
                  <p></p>
                </div>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">👥</div>
                <div>
                  <h4>{{ t('about.featCustomers') }}</h4>
                  <p></p>
                </div>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">💬</div>
                <div>
                  <h4>{{ t('about.featAdvice') }}</h4>
                  <p>{{ t('about.featAdviceDesc') }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="about-image">
            <div class="image-wrapper">
              <img src="../assets/logo.jfif" alt="Մեր ցուցասրահը" class="main-image" />
              <div class="">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section class="contact-section">
      <div class="container">
        <div class="contact-card">
          <div class="contact-header">
            <div class="contact-icon">💬</div>
            <h2>{{ t('about.contactTitle') }}</h2>
            <p>{{ t('about.contactSubtitle') }}</p>
          </div>
          
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-item-icon">📞</div>
              <div class="contact-item-content">
                <h4>{{ t('footer.phone') }}</h4>
                <a href="tel:+37493033883">+374 93 033 883</a>
                <a href="tel:+37455692222">+374 55 692 222</a>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item-icon">✉️</div>
              <div class="contact-item-content">
                <h4>{{ t('footer.email') }}</h4>
                <a href="Vardandavtyan478@gmail.com">Vardandavtyan478@gmail.com</a>
                
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item-icon">📍</div>
              <div class="contact-item-content">
                <h4>{{ t('footer.address') }}</h4>
                <p>{{ t('about.addressCity') }}</p>
                <p>{{ t('about.addressCountry') }}</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item-icon">🕒</div>
              <div class="contact-item-content">
                <h4>{{ t('about.workHours') }}</h4>
                <p>{{ t('about.workHours') }}</p>
                <p>{{ t('about.workHoursSat') }}</p>
              </div>
            </div>
          </div>

          <div class="cta-section">
            <h3>{{ t('about.ctaReady') }}</h3>
            <p>{{ t('about.ctaSub') }}</p>
            <div class="cta-buttons">
              <a href="tel:+37491234567" class="cta-button primary">
                📞 {{ t('about.call') }}
              </a>
              <a href="mailto:info@cars.am" class="cta-button secondary">
                ✉️ {{ t('about.emailUs') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.about-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #1f2937;
  background: #ffffff;
}

.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05) 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.95;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-content {
  padding: 6rem 2rem;
  background: white;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
  font-weight: 800;
}

.about-text > p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  gap: 2rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  color: white;
}

.feature-item h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.feature-item p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
}

.about-image {
  position: relative;
  
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  aspect-ratio: 4/3;
  
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.main-image:not([src=""]) ~ .image-placeholder {
  display: none;
  
}

.team-section {
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 6rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
}

.team-member {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.member-image {
  position: relative;
  overflow: hidden;
}

.team-photo {
  width: 100%;
  height: 700px;
  object-fit: cover;
  display: block;
}

.member-image .image-placeholder {
  aspect-ratio: 1/1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  font-weight: 600;
}

.team-photo:not([src=""]) ~ .image-placeholder {
  display: none;
}

.member-info {
  padding: 2rem;
}

.member-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.member-role {
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.member-contacts {
  display: grid;
  gap: 0.75rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-radius: 10px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  transform: translateX(5px);
}

.contact-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 4rem;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 40px;
}

.contact-header h2 {
  font-size: 2.5rem;
  font-weight: 1000;
  color: #1f2937;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1.1rem;
  color: #6b7280;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-item {
  display: flex;
  gap: 2rem;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
}

.contact-item-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
}

.contact-item-content h4 {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.contact-item-content a {
  display: block;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.contact-item-content a:hover {
  color: #764ba2;
  transform: translateX(3px);
}

.contact-item-content p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.cta-section {
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.cta-section h3 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.cta-button.primary {
  background: white;
  color: #667eea;
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

@media (max-width: 968px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-title {
    font-size: 3rem;
  }

  .about-text h2,
  .section-header h2,
  .contact-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .about-content,
  .team-section,
  .contact-section {
    padding: 4rem 1.5rem;
  }

  .contact-card {
    padding: 2.5rem 1.5rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 400px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .about-text h2,
  .section-header h2,
  .contact-header h2 {
    font-size: 1.75rem;
  }

  .cta-section h3 {
    font-size: 1.5rem;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>