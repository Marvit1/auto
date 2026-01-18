<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000, // Animation duration in milliseconds
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  startOnMount: {
    type: Boolean,
    default: false,
  },
})

const count = ref(0)
const isAnimating = ref(false)
let animationFrame: number | null = null

const startAnimation = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  const start = 0
  const end = props.value
  const range = end - start
  const startTime = performance.now()
  
  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Ease-out function for smooth deceleration
    const easeOutProgress = 1 - Math.pow(1 - progress, 2)
    count.value = Math.floor(start + range * easeOutProgress)
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(updateCounter)
    } else {
      count.value = end
      isAnimating.value = false
    }
  }
  
  animationFrame = requestAnimationFrame(updateCounter)
}

const reset = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  count.value = 0
  isAnimating.value = false
}

// Start animation when component mounts if startOnMount is true
onMounted(() => {
  if (props.startOnMount) {
    // Small delay to ensure the component is mounted and visible
    setTimeout(startAnimation, 100)
  }
})

// Clean up animation frame on unmount
onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

defineExpose({
  start: startAnimation,
  reset,
})
</script>

<template>
  <span class="animated-counter">
    {{ prefix }}{{ count }}{{ suffix }}
  </span>
</template>

<style scoped>
.animated-counter {
  display: inline-block;
  transition: transform 0.3s ease-out;
}

.animated-counter:hover {
  transform: scale(1.05);
}
</style>
