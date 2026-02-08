<template>
  <a 
    href="tel:
+374 93 033 883" 
    class="call-to-action"
    @click="handleCallClick"
  >
    <div class="phone-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="text-content">
      <div class="top-text">{{ t('cta.orderCall') }}</div>
      <div class="bottom-text">{{ t('cta.phone') }}</div>
    </div>
  </a>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const handleCallClick = () => {
  // You can add analytics or other tracking here
  console.log('Call button clicked');
};
</script>

<style scoped>
.call-to-action {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  font-family: Arial, sans-serif;
  margin-left: 15px;
  min-width: 180px;
}

.call-to-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, #43A047 0%, #1B5E20 100%);
}

.call-to-action:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
}

.phone-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 8px;
}

.phone-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.text-content {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  text-align: left;
}

.top-text {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.bottom-text {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

/* Responsive styles */
@media (max-width: 768px) {
  .call-to-action {
    padding: 8px 12px;
    min-width: auto;
    margin-left: 10px;
  }
  
  .text-content {
    display: none;
  }
  
  .phone-icon {
    width: 36px;
    height: 36px;
    padding: 6px;
  }
  
  .phone-icon svg {
    width: 18px;
    height: 18px;
  }
}
</style>