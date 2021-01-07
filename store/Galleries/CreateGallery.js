export const state = () => ({
  _IMAGES: [],
  _IMAGES_COPY: [],
  _GALLERY: null,
  _SHOW_MODAL: false,
  _PROGRESS: 0,
  _PROGRESS_SUBTITLE: 'Создаем галерею',
  _UPLOADED_IMAGES: [],
  _MAIN_TITLE: null
})

export const getters = {
  GET_IMAGES: state => state._IMAGES ? [...state._IMAGES] : [],
  GET_IMAGES_COPY: state => state._IMAGES_COPY,
  GET_GALLERY: state => state._GALLERY,
  GET_SHOW_GALLERY: state => state._SHOW_MODAL,
  GET_PROGRESS: state => state._PROGRESS,
  GET_PROGRESS_SUBTITLE: state => state._PROGRESS_SUBTITLE,
  GET_UPLOADED_IMAGES: state => state._UPLOADED_IMAGES,
  GET_MAIN_TITLE: state => state._MAIN_TITLE
}

export const mutations = {
  UPDATE_IMAGES: (state, images) => state._IMAGES = images,
  UPDATE_IMAGES_COPY: (state, images) => state._IMAGES_COPY = images,
  UPDATE_GALLEERY: (state, gallery) => state._GALLERY = gallery,
  SHOW_MODAL: state => state._SHOW_MODAL = true,
  HIDE_MODAL: state => state._SHOW_MODAL = false,
  UPDATE_PROGRESS_SUBTITLE: (state, text) => state._PROGRESS_SUBTITLE = text,
  UPDATE_UPLOADED_IMAGES: (state, array) => {
    state._UPLOADED_IMAGES = state._UPLOADED_IMAGES.concat(array)
    state._GALLERY.images = state._GALLERY.images ? state._GALLERY.images.concat(array): state._UPLOADED_IMAGES
  },
  CLEAR_UPLOADED_IMAGES: state => state._UPLOADED_IMAGES = [],
  UPDATE_PROGRES: (state, progress) => state._PROGRESS = progress,
  UPDATE_MAIN_TITLE: (state, title) => state._MAIN_TITLE = title
}

export const actions = {
  UPDATE_IMAGES: ({ commit }, images) => commit('UPDATE_IMAGES', images),
  UPDATE_IMAGES_COPY: ({ commit }, images) => commit('UPDATE_IMAGES_COPY', images),
  UPDATE_GALLEERY: ({ commit }, gallery) => commit('UPDATE_GALLEERY', gallery),
  SHOW_MODAL: ({ commit }) => commit('SHOW_MODAL'),
  HIDE_MODAL: ({ commit }) => commit('HIDE_MODAL'),
  CREATE_GALLERY: async function ({ commit, dispatch, getters }, form) {
    const images = getters['GET_IMAGES']
    this.$axios.post('/gallery/add', form)
      .then(response => {
        commit('UPDATE_GALLEERY', response.data.gallery)
        commit('UPDATE_PROGRESS_SUBTITLE', response.data.msg)
        if (images && images.length > 0) dispatch('UPLOAD_IMAGES')
        else {
          this._vm.$cookies.remove('upload')
          commit('HIDE_MODAL')
          commit('UPDATE_PROGRESS_SUBTITLE', 'Создаем галерею')
        }
      })
      .catch(error => {
        console.error(error)
        this._vm.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
      })
  },
  STOP_UPLOAD: function ({ commit }) {
    this._vm.$cookies.remove('upload')
    commit('UPDATE_GALLEERY', null)
    commit('UPDATE_IMAGES', [])
    commit('UPDATE_IMAGES_COPY', [])
    commit('UPDATE_PROGRESS_SUBTITLE', 'Создаем галерею')    
    commit('UPDATE_PROGRES', 0)
    commit('CLEAR_UPLOADED_IMAGES')
    commit('HIDE_MODAL')
  },
  UPLOAD_IMAGES: async function ({ commit, getters, dispatch }) {
    commit('UPDATE_PROGRESS_SUBTITLE', 'Загружаем файлы')    
    const uploadImageNumber = 1
    const images = getters['GET_IMAGES']
    const imagesLength = images.length
    const imagesCopy = getters['GET_IMAGES_COPY']
    const imagesLengthLength = imagesCopy.length
    const uploadedImages = getters['GET_UPLOADED_IMAGES']
    const uploadedImagesLength = uploadedImages.length
    // const cycleLength = Math.ceil(imagesLength / 10)
    const progress = Number(100 / imagesLengthLength * uploadedImagesLength).toFixed(0)
    commit('UPDATE_PROGRES', progress)
    if (imagesLength === 0) return dispatch('STOP_UPLOAD')
    const arrayForUpload = images.splice(0 , uploadImageNumber)
    const fd = new FormData()
    if (arrayForUpload) arrayForUpload.forEach(file => fd.append('images', file, file.name))
    this.$axios.post('/gallery/add-images', fd).then(response => {
      commit('UPDATE_UPLOADED_IMAGES', response.data.images)
      dispatch('CHANGE_GALLERY')
    }).catch(error => {
      console.error(error)
      dispatch('STOP_UPLOAD')
      this._vm.$notify({
        group: 'foo',
        type: 'error',
        title: 'System',
        text: error.response ? error.response.data.msg : 'Что-то пошло не так'
      })
    })
  },
  CHANGE_GALLERY: async function ({ getters, dispatch }) {
    const gallery = getters['GET_GALLERY']
    this.$axios.put(`/gallery/change/${gallery._id}`, gallery).then(response => {
      dispatch('UPLOAD_IMAGES')
    }).catch(error => {
      console.error(error)
      this._vm.$notify({
        group: 'foo',
        type: 'error',
        title: 'System',
        text: error.response ? error.response.data.msg : 'Что-то пошло не так'
      })
    })
  },
  UPDATE_MAIN_TITLE: ({ commit }, title) => commit('UPDATE_MAIN_TITLE', title)
}