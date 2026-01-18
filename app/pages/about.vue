


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
     
             <!-- Team Member: David -->
<div class="team-member">
  <div class="member-image">
    <img src="../assets/David.jfif" 
         alt="Դավիթ Ոսկանյան" 
         class="team-photo" />
  </div>
  <div class="member-info">
    <h3>{{ t('about.davidName') }}</h3>
    <p class="member-role">{{ t('about.davidRole') }}</p>
    <div class="member-contacts">
      <a href="tel:+37433828268" class="contact-link">
        📞 +374 33 828 268
      </a>
      <a href="mailto:Davdvoskanyan@gmail.com" class="contact-link">
        ✉️ Davdvoskanyan@gmail.com
      </a>
    </div>
  </div>
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

           <!-- Team Member  3-->
          

          <div class="team-member">
            <div class="member-image">
<img src="../assets/Art.jfif" 
     alt="Արտակ Վոսկանյան" 
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
import { ref } from 'vue'

const imageLoaded = ref(false)
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

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 3rem 2rem;
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

/* Team Section */
.team-section {
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 4rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.team-member {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.15);
}

.member-image {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  opacity: 0.8;
}

.member-info {
  padding: 1.5rem;
}

.member-info h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.3rem;
}

.member-role {
  color: #667eea;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.member-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  background: #f9fafb;
  border-radius: 8px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  transform: translateX(3px);
}

/* About Content */
.about-content {
  padding: 4rem 2rem;
  background: white;
}

.about-grid {
  display: grid;
  gap: 2rem;
}

.about-text h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
  font-weight: 800;
}

.about-text > p {
  font-size: 1rem;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 2rem;
}

.features {
  display: grid;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(6px);
  box-shadow: 0 6px 15px rgba(102, 126, 234, 0.1);
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
  color: white;
}

.feature-item h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.3rem;
}

.feature-item p {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Contact Section */
.contact-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 36px;
}

.contact-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1rem;
  color: #6b7280;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.contact-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.12);
}

.contact-item-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 22px;
}

.contact-item-content h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.contact-item-content a {
  display: block;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  transition: all 0.3s ease;
}

.contact-item-content a:hover {
  color: #764ba2;
  transform: translateX(2px);
}

.contact-item-content p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.3rem;
}

.cta-section {
  text-align: center;
  padding: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.cta-section h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
}

.cta-section p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
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
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.cta-button.primary {
  background: white;
  color: #667eea;
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-subtitle {
    font-size: 1rem;
  }

  .about-content,
  .team-section,
  .contact-section {
    padding: 3rem 1.5rem;
  }

  .contact-card {
    padding: 2rem 1.5rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 1.5rem;
  }

  .contact-item-icon {
    margin: 0 auto;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }

  .cta-button {
    width: 100%;
  }

  .section-header h2,
  .about-text h2,
  .contact-header h2 {
    font-size: 1.5rem;
  }

  .cta-section h3 {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hero-section {
    min-height: 150px;
    padding: 2rem 1rem;
  }

  .hero-badge {
    font-size: 0.8rem;
    padding: 6px 14px;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .section-header h2,
  .about-text h2,
  .contact-header h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .member-image {
    height: 200px;
  }

  .image-placeholder {
    font-size: 48px;
  }

  .contact-card {
    padding: 1.5rem 1rem;
  }

  .contact-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .cta-section {
    padding: 2rem 1rem;
  }

  .cta-section h3 {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }

  .cta-section p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }
}</style>