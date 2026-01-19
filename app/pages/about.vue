<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">{{ $t('about.badge') }}</span>
         <!-- <h1 class="hero-title">{{ $t('about.title') }}</h1> -->
          <p class="hero-subtitle">{{ $t('about.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">{{ $t('about.teamBadge') }}</span>
          <h2>{{ $t('about.teamTitle') }}</h2>
          <p>{{ $t('about.teamSubtitle') }}</p>
        </div>
        
        <div class="team-grid">
          <!-- Վարդան -->
          <div class="team-member">
            <div class="member-image">
              <img src="../assets/Vrd.jfif" alt="Վարդան Դավթյան" class="team-photo" />
            </div>
            <div class="member-info">
              <h3>{{ $t('about.vardaName') }}</h3>
              <p class="member-role">{{ $t('about.vardaRole') }}</p>
             <p class="member-bio">{{ $t('about.vardaBio') }}</p> 
              <div class="member-contacts">
                <a href="tel:+37493033883" class="contact-link">
                  <span class="contact-icon">📞</span>
                  <span>+374 93 033 883</span>
                </a>
                <a href="mailto:Vardandavtyan478@gmail.com" class="contact-link">
                  <span class="contact-icon">✉️</span>
                  <span>Vardandavtyan478@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Արտակ -->
          <div class="team-member">
            <div class="member-image">
              <img src="../assets/artak.jfif" alt="Արտակ Վոսկանյան" class="team-photo" />
            </div>
            <div class="member-info">
              <h3>{{ $t('about.artakName') }}</h3>
              <p class="member-role">{{ $t('about.artakRole') }}</p>
             <p class="member-bio">{{ $t('about.artakBio') }}</p> 
              <div class="member-contacts">
                <a href="tel:+37455692222" class="contact-link">
                  <span class="contact-icon">📞</span>
                  <span>+374 55 692 222</span>
                </a>
                <a href="mailto:artak@example.com" class="contact-link">
                  <span class="contact-icon">✉️</span>
                  <span>rtkvoskanyan@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Դավիթ -->
          <div class="team-member">
            <div class="member-image">
              <img src="../assets/Davo.jfif" alt="Դավիթ Ոսկանյան" class="team-photo" />
            </div>
            <div class="member-info">
              <h3>{{ $t('about.davidName') }}</h3>
              <p class="member-role">{{ $t('about.davidRole') }}</p>
             <p class="member-bio">{{ $t('about.davidBio') }}</p>
              <div class="member-contacts">
                <a href="tel:+37433828268" class="contact-link">
                  <span class="contact-icon">📞</span>
                  <span>+374 33 828 268</span>
                </a>
                <a href="mailto:Davdvoskanyan@gmail.com" class="contact-link">
                  <span class="contact-icon">✉️</span>
                  <span>Davdvoskanyan@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section 
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <h3 class="stat-number">{{ $t('about.stat1Number') }}</h3>
            <p class="stat-label">{{ $t('about.stat1Label') }}</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number">{{ $t('about.stat2Number') }}</h3>
            <p class="stat-label">{{ $t('about.stat2Label') }}</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number">{{ $t('about.stat3Number') }}</h3>
            <p class="stat-label">{{ $t('about.stat3Label') }}</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number">{{ $t('about.stat4Number') }}</h3>
            <p class="stat-label">{{ $t('about.stat4Label') }}</p>
          </div>
        </div>
      </div>
    </section>-->

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="section-header">
         <!--<span class="section-badge">{{ $t('about.contactBadge') }}</span>-->
          <h2>{{ $t('about.contactTitle') }}</h2>
          <p>{{ $t('about.contactSubtitle') }}</p>
        </div>

        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-item-icon">📞</div>
            <div class="contact-item-content">
              <!--<h4>{{ $t('about.phone') }}</h4>-->
              <a href="tel:+37493033883">+374 93 033 883</a>
              <a href="tel:+37455692222">+374 55 692 222</a>
              <a href="tel:+37433828268">+374 33 828 268</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-item-icon">✉️</div>
            <div class="contact-item-content">
              <!--<h4>{{ $t('about.email') }}</h4>-->
              <a href="mailto:Vardandavtyan478@gmail.com">Vardandavtyan478@gmail.com</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-item-icon">📍</div>
            <div class="contact-item-content">
              <!--<h4>{{ $t('about.address') }}</h4>-->
              <h4>Երևան, Խանզադյան 8/2</h4>
              <!--<p>{{ $t('about.addressFull') }}</p>-->
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-item-icon">🕒</div>
            <div class="contact-item-content">
              <!--<h4>{{ $t('about.hours') }}</h4>-->
              <h4>Երկուշաբթի - կիրակի | 11:00 - 24:00</h4>
              <!--<p>{{ $t('about.hoursText') }}</p>-->
            </div>
          </div>
        </div>

       
      </div>
    </section>
  </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.about-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1f2937;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4rem 2rem;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px);
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
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-badge {
  display: inline-block;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.95;
  line-height: 1.6;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
  color: #667eea;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

/* Team Section */
.team-section {
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 5rem 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.team-member {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(102,126,234,0.2);
}

.member-image {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 400px;
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

.member-info {
  padding: 2rem;
}

.member-info h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.member-role {
  color: #667eea;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.member-bio {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.member-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: #f9fafb;
  border-radius: 10px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
  color: #667eea;
  transform: translateX(4px);
}

.contact-icon {
  font-size: 18px;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Contact Section */
.contact-section {
  padding: 5rem 2rem;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-item {
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(102,126,234,0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(102,126,234,0.12);
}

.contact-item-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 1rem;
}

.contact-item-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.8rem;
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
  transform: translateX(4px);
}

.contact-item-content p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CTA Section */
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
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.1rem 2.2rem;
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
  box-shadow: 0 10px 25px rgba(255,255,255,0.3);
}

.cta-button.secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .team-section,
  .contact-section {
    padding: 3rem 1.5rem;
  }

  .contact-grid,
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hero-section {
    min-height: 200px;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.4rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .contact-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}</style>