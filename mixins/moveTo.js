export default {
  methods: {
    scrollTo: (id) => {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
}