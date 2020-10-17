export default ({ $axios, store, redirect }) => {
  const token = localStorage.getItem('token')
  if (!token) return ''
  $axios.setToken(token, 'bearer')
  $axios.get('/auth/verify').then(response => {
    console.log(response)
    store.dispatch('Auth/signin', response.data.user)
  }).catch(error => {
    console.error(error)
    return redirect('/')
  })
}