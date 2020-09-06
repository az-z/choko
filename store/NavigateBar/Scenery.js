export const state = () => ({
  _TOGGLES: {
    BG: true
  }
})

export const getters = {
  getTogglesBG: state => state._TOGGLES.BG
}

export const mutations = {
  TOGGLE_BG: (state, boolen) => state._TOGGLES.BG = boolen
}

export const actions = {
  toggleBG: ({ commit }, boolen) => commit('TOGGLE_BG', boolen)
}