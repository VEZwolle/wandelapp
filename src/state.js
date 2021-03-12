import { reactive } from 'vue'
import distance from '@turf/distance'
import sections from '../sections.json'
import stateStore from './util/state-store'

const state = {
  // State
  route: reactive({
    started: false,
    offlineAvailable: false,
    currentSectionCode: null,
    currentPosition: null
  }),

  sections: sections.map((section, i) => ({
    ...section,

    get active () {
      return section.code === state.route.currentSectionCode
    },
    get checkpoint () {
      const route = section.route
      return route[route.length - 1]
    },
    get next () {
      return state.sections[i + 1]
    }
  })),

  // Getters
  get currentSection () {
    return state.sections.find(s => s.code === state.route.currentSectionCode)
  },

  get remainingDistance () {
    const from = state.route.currentPosition
    const to = state.currentSection?.checkpoint

    if (!from || !to) return null

    const km = distance(from, to)
    const m = Math.round(km * 1000)

    return m
  },

  get closeToCheckpoint () {
    if (state.remainingDistance === null) {
      return false
    }

    return state.remainingDistance < state.currentSection.radius
  },

  get isFinished () {
    return state.route.started && !state.route.currentSectionCode
  },

  get videos () {
    return state.sections.reduce((videos, section) => {
      const sectionVideos = section.videos.map((video) => ({
        key: video.key,
        src: video.src
      }))

      return [...videos, ...sectionVideos]
    }, [])
  },

  // Methods
  init () {
    state.route.started = stateStore.get('started') || false
    state.route.offlineAvailable = stateStore.get('offlineAvailable') || false
    state.route.currentSectionCode = stateStore.get('currentSectionCode') || null
  },

  reset () {
    stateStore.remove('started')
    stateStore.remove('currentSectionCode')
    location.reload()
  },

  start () {
    state.route.started = true
    stateStore.set('started', true)

    const firstCode = sections[0].code
    state.route.currentSectionCode = firstCode
    stateStore.set('currentSectionCode', firstCode)
  },

  setOfflineAvailable (val) {
    state.route.offlineAvailable = val
    stateStore.set('offlineAvailable', val)
  },

  findSection (code) {
    return state.sections.find(s => s.code === code)
  },

  beenToCheckpoint (code) {
    if (state.isFinished) {
      return true
    }

    const current = state.sections.findIndex(s => s.code === state.route.currentSectionCode)
    const wanted = state.sections.findIndex(s => s.code === code)

    return wanted < current
  },

  isFirstSection (code) {
    return state.sections[0].code === code
  },

  isLastSection (code) {
    return state.sections[state.sections.length - 1].code === code
  },

  goToNextSection () {
    const nextCode = state.currentSection?.next?.code || null
    state.route.currentSectionCode = nextCode
    stateStore.set('currentSectionCode', nextCode)
  }
}

export default state
