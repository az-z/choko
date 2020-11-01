export const state = () => ({
  _AUTH: false
})

export const getters = {
  getAuth: state => state._AUTH
}

export const mutations = {
  LOGIN: state => state._AUTH = true,
  LOGOUT: state => state._AUTH = false
}

export const actions = {
  login: ({ commit }) => commit('LOGIN'),
  logout: ({ commit }) => commit('LOGOUT')
}
