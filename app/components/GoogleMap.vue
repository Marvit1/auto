<template>
  <div class="google-map-container">
    <div ref="mapContainer" class="map"></div>
    <div v-if="loading" class="map-loading">
      <div class="loader">Բեռնվում է քարտեզը...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  apiKey: {
    type: String,
    required: true
  },
  center: {
    type: Object,
    default: () => ({
      lat: 40.1772,  // Default to Yerevan coordinates
      lng: 44.5035
    })
  },
  zoom: {
    type: Number,
    default: 15
  },
  markerTitle: {
    type: String,
    default: 'Մեր գրասենյակը'
  },
  mapStyles: {
    type: Array,
    default: () => [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          { saturation: 36 },
          { color: '#333333' },
          { lightness: 40 }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          { visibility: 'on' },
          { color: '#ffffff' },
          { lightness: 16 }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#fefefe' },
          { lightness: 20 }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#fefefe' },
          { lightness: 17 },
          { weight: 1.2 }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          { color: '#f5f5f5' },
          { lightness: 20 }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { color: '#f5f5f5' },
          { lightness: 21 }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#ffffff' },
          { lightness: 17 }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#ffffff' },
          { lightness: 29 },
          { weight: 0.2 }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          { color: '#ffffff' },
          { lightness: 18 }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          { color: '#ffffff' },
          { lightness: 16 }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          { color: '#f2f2f2' },
          { lightness: 19 }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { color: '#e9e9e9' },
          { lightness: 17 }
        ]
      }
    ]
  }
});

const mapContainer = ref(null);
const map = ref(null);
const marker = ref(null);
const loading = ref(true);
const googleMapsScript = ref(null);

const initMap = () => {
  // Check if Google Maps API is already loaded
  if (window.google && window.google.maps) {
    createMap();
    return;
  }

  // Load Google Maps API if not already loaded
  if (!document.querySelector('#google-maps-script')) {
    googleMapsScript.value = document.createElement('script');
    googleMapsScript.value.id = 'google-maps-script';
    googleMapsScript.value.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places`;
    googleMapsScript.value.async = true;
    googleMapsScript.value.defer = true;
    googleMapsScript.value.onload = createMap;
    document.head.appendChild(googleMapsScript.value);
  }
};

const createMap = () => {
  // Create map instance
  map.value = new window.google.maps.Map(mapContainer.value, {
    zoom: props.zoom,
    center: props.center,
    styles: props.mapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
  });

  // Add marker
  marker.value = new window.google.maps.Marker({
    position: props.center,
    map: map.value,
    title: props.markerTitle,
    animation: window.google.maps.Animation.DROP
  });

  // Add info window
  const infoWindow = new window.google.maps.InfoWindow({
    content: `<div style="padding: 10px;">
                <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${props.markerTitle}</h3>
                <p style="margin: 0;">Մեր գրասենյակի հասցեն</p>
              </div>`
  });

  // Show info window on marker click
  marker.value.addListener('click', () => {
    infoWindow.open(map.value, marker.value);
  });

  // Open info window by default
  infoWindow.open(map.value, marker.value);
  
  loading.value = false;
};

// Initialize map when component is mounted
onMounted(() => {
  initMap();
});

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  if (googleMapsScript.value) {
    document.head.removeChild(googleMapsScript.value);
  }
  
  if (marker.value) {
    marker.value.setMap(null);
  }
  
  if (map.value) {
    // Remove all map event listeners
    window.google.maps.event.clearInstanceListeners(map.value);
  }
});
</script>

<style scoped>
.google-map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: #e9e9e9;
}

.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.loader {
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  color: #2c3e50;
}

/* Responsive styles */
@media (max-width: 768px) {
  .google-map-container,
  .map {
    min-height: 300px;
  }
}
</style>
