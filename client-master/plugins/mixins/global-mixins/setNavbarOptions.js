export default {
  data() {
    return {
      navItemsSchema: [
        { name: 'محصولات', url_0: '/product/', url_1: '/category/', type: 1 }
      ]
    }
  },
  methods: {
    createUrlWithSlug(item) {
      let slug = ""

      if (item.TC_FFormType == 1) {
        slug = "/product/category/"
      } else {
        // might be a category of categories or a single blog
        if (item.TC_FSubGroup == 0) {
          // single blog
          slug = "/category/"
        } else {
          // category of blogs
          slug = "/category/category/"
        }
      }
      if (item.TC_FSlug) {
        slug += item.TC_FSlug
      }
      return slug
    }
  }
}