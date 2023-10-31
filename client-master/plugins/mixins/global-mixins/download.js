import mimeType from 'mime-types'

export default {
  methods: {
    download(url, responseFileName = null) {
      let fileName = responseFileName ? responseFileName : url.split('/').reverse()[0]
      const mimeTypeName = mimeType.lookup(url)
      this.$axios.$get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response], { type: mimeTypeName })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    }
  }
}