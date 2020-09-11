export default ({store, redirect}) => {
  const auth = store.state.Auth._SIGNIN
  if (auth) return redirect('/profile')
  else return redirect('/auth')
}