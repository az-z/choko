export default async ({ $axios, store, redirect }) => {
  const token = localStorage.getItem('token')
  if (!token) return ''
  $axios.setToken(token, 'bearer')
  await $axios.get('/auth/verify').then(response => {
    store.dispatch('Auth/signin', response.data.user)
  }).catch(error => {
    console.error(error)
    // redirect('/')
  })
}