<template>
  <div class="modern-carousel-section">
    <div class="carousel-header">
      <div class="header-content">
        <h2 class="gradient-title">Մեր Ծառայությունները</h2>
        <p class="subtitle">Մենք առաջարկում ենք ավտոմեքենաների լայն տեսականի</p>
      </div>
    </div>

    <div class="services-grid">
      <div 
        v-for="(service, index) in services" 
        :key="index" 
        class="service-card"
      >
        <div class="service-icon">
          <i :class="service.icon"></i>
        </div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: 'Ավտոմեքենաների ներկրում',
    description: 'Առաքում աշխարհի ցանկացած կետից',
    icon: 'fas fa-shipping-fast'
  },
  {
    title: 'Մաքսային մաքրում',
    description: 'Պրոֆեսիոնալ մաքսային մաքրում',
    icon: 'fas fa-file-invoice'
  },
  {
    title: 'Ապահովագրություն',
    description: 'Ավտոմեքենաների ապահովագրություն',
    icon: 'fas fa-shield-alt'
  },
  {
    title: 'Տեխնիկական ստուգում',
    description: 'Մանրակրկիտ ստուգում գնելուց առաջ',
    icon: 'fas fa-car-crash'
  }
]
</script>

<style scoped>
.modern-carousel-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gradient-title {
  font-size: 2.5rem;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.subtitle {
  color: #6b7280;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.service-icon {
  font-size: 2.5rem;
  color: #4f46e5;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.service-card p {
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .gradient-title {
    font-size: 2rem;
  }
}
</style>