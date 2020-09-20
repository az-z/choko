export const state = () => ({
  _GALLERIES: null
})

export const getters = {
  getGalleries: state => state._GALLERIES
}

export const mutations = {
  UPDATE_GALLERIES: (state, galleries) => state._GALLERIES = galleries,
  ADD_GALLERY: (state, gallery) => state._GALLERIES.push(gallery)
}

export const actions = {
  updateGalleries: function ({ commit }) {
    this.$axios.get('/api/gallery/get/user/galleries').then(response => {
      commit('UPDATE_GALLERIES', response.data.galleries)
    }).catch(error => {
      console.error(error)
    })
  },
  addGallery: function ({ commit },{ notify, form, router }) {
    this.$axios.post('/api/gallery/add', form).then(response => {
      debugger
      commit('ADD_GALLERY', response.data.gallery)
      notify({
        group: 'foo',
        title: 'SUCCESS',
        text: response.data.msg,
        type: 'success'
      })
      router.push('/profile/gallery')
    }).catch(error => {
      notify({
        group: 'foo',
        title: 'ERROR',
        text: error.response.data.msg,
        type: 'error'
      })
    })
  }
}