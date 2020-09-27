export const state = () => ({
  _USER: null,
  _SIGNIN: false
})

export const getters = {
  getUser: state => state._USER,
  getSignin: state => state._SIGNIN,
  // getForm: state => ({
  //   description: state._USER.description,
  //   site: state._USER.site,
  //   facebook: state._USER.facebook,
  //   phoneNumber: state._USER.phoneNumber
  // })
}

export const mutations = {
  UPDATE_USER: (state, user) => state._USER = user,
  REMOVE_USER: state => state._USER = null,
  SIGNIN: state => state._SIGNIN = true,
  SIGNOUT: state => state._SIGNIN = false,
}

export const actions = {
  signin: ({ commit }, user) => {
    commit('UPDATE_USER', user)
    commit('SIGNIN')
  },
  signout: ({ commit }) => {
    commit('REMOVE_USER')
    commit('SIGNOUT')
  },
  updateUser: ({ commit }, user) => commit('UPDATE_USER', user)
}