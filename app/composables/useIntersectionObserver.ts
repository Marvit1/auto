import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const target = ref<HTMLElement | null>(null)
  const isIntersecting = ref(false)
  const observer = ref<IntersectionObserver | null>(null)

  const startObserver = () => {
    if (!target.value) return

    observer.value = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      
      isIntersecting.value = entry.isIntersecting
      if (entry.isIntersecting && observer.value) {
        observer.value.disconnect()
      }
    }, options)

    observer.value.observe(target.value)
  }

  onMounted(() => {
    startObserver()
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    target,
    isIntersecting
  }
}
