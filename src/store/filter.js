export default {
  namespaced: true,
  state: {
    tags: [],
    type: '',
    shape: 'circle',
    size: 'small'
  },
  mutations: {
    'SET_TAGS' (state, tags) {
      state.tags = tags
    },
    'TOGGLE_TYPE' (state, type) {
      state.type = type === state.type ? '' : type
    },
    'TOGGLE_SHAPE' (state, shape) {
      state.shape = shape
    },
    'TOGGLE_SIZE' (state, size) {
      state.size = size
    }
  },
  actions: {},
  getters: {
    tags (state) {
      return state.tags
    },
    type (state) {
      return state.type
    },
    shape (state) {
      return state.shape
    },
    size (state) {
      return state.size
    }
  }
}
