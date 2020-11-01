export default async ({ $axios, store, redirect }) => {
  const token = localStorage.getItem('aToken')
  if (!token) return ''
  $axios.setToken(token, 'bearer')
  try {
    const verifyResponse = await $axios.get('/auth/admin/verify')
    console.log(verifyResponse)
    store.dispatch('Admin/Auth/login')
  } catch (error) {    
    console.error(error)
    redirect('/')
  }
}