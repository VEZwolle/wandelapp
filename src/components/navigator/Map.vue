<template>
  <div ref="map" />
</template>

<script>
import state from '../../state'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const defaultCamera = {
  center: [6.085872427345635, 52.543825717534816],
  bearing: 0,
  pitch: 0,
  zoom: 14.3
}

export default {
  props: {
    hasFocus: Boolean
  },
  setup () {
    return { state }
  },
  watch: {
    hasFocus (hasFocus) {
      if (hasFocus) {
        this.highlightSection(this.state.route.currentSectionCode)
        this.geolocate.trigger()
      }
    }
  },
  mounted () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/streets-v11',
      ...defaultCamera
    })

    this.initGeolocate()

    this.map.on('load', () => {
      this.drawRoute()
      this.drawMarkers()

      if (this.hasFocus) {
        this.highlightSection(this.state.route.currentSectionCode)
        this.geolocate.trigger()
      }
    })
  },
  methods: {
    drawRoute () {
      this.state.sections.forEach((section) => {
        const id = `route-${section.code}`

        this.map.addLayer({
          id: id,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: section.route
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#e2001a',
            'line-width': 2,
            'line-opacity': 0,
            'line-opacity-transition': { duration: 500 }
          }
        })

        // Toggle fade-in
        this.map.setPaintProperty(id, 'line-opacity', 0.75)
      })
    },
    drawMarkers () {
      this.markers = this.state.sections.map((section, i) => {
        const el = document.createElement('div')
        el.id = `marker-${section.code}`
        el.className = 'marker'
        el.innerHTML = i === 0 ? 'Start' : i

        el.addEventListener('click', () => {
          if (!this.state.beenToCheckpoint(section.code)) return
          this.$router.push({ name: 'checkpoint', params: { code: section.code } })
        })

        const options = {
          element: el,
          anchor: 'bottom',
          offset: [0, -5]
        }

        return new mapboxgl.Marker(options)
          .setLngLat(section.checkpoint)
          .addTo(this.map)
      })
    },
    highlightSection (code) {
      if (!this.map) return

      // Highlight section route
      const layers = this.map.getStyle().layers
      layers.forEach((layer) => {
        if (!layer.id.startsWith('route-')) return

        if (layer.id === `route-${code}`) {
          this.map.setPaintProperty(layer.id, 'line-opacity', 0.75)
          this.map.setPaintProperty(layer.id, 'line-width', 6)

          const camera = this.state.currentSection.camera
          const speed = this.state.isFirstSection(code) ? 0.1 : 0.5
          this.map.flyTo({ speed, ...camera })
        } else {
          this.map.setPaintProperty(layer.id, 'line-opacity', 0.4)
          this.map.setPaintProperty(layer.id, 'line-width', 2)
        }
      })

      // Highlight section marker
      this.markers.forEach((marker) => {
        const el = marker.getElement()
        if (el.id === `marker-${code}`) {
          el.classList.add('marker--active')
        } else {
          el.classList.remove('marker--active')
        }
      })

      // Reset camera if no currentSectionCode
      if (!code) {
        this.map.flyTo({ speed: 0.5, ...defaultCamera })
      }
    },
    initGeolocate () {
      this.geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false
      })

      this.geolocate._updateCamera = () => { } // Disable camera following geolocation

      this.map.addControl(this.geolocate)

      this.geolocate.on('geolocate', (e) => {
        const { longitude, latitude } = e.coords
        this.state.route.currentPosition = [longitude, latitude]
      })
    }
  }
}
</script>

<style>
.mapboxgl-control-container {
  display: none !important;
}

/* Marker */
.marker {
  @apply h-6 px-2 bg-black bg-opacity-40 text-white text-sm font-serif flex justify-center items-center cursor-pointer;
  min-width: 1.5rem;
}

/* Marker arrow */
.marker::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 5px);
  transition: border-top-color 0.2s;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.4);
}

/* Marker shadow */
.marker::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.4);
}

/* Marker active */
.marker.marker--active {
  background: #e2001a;
}
.marker.marker--active::after {
  border-top-color: #e2001a;
}
</style>
