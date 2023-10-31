export default {
  methods: {
    async getSalePageList() {
      try {
        const response = await this.$authAxios.$get(
          "/home/get/0?mode=pageSaleList"
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getCategorySalePages(salePageList, category) {
      if (salePageList && salePageList.length > 0)
        return salePageList.filter(sp => {
          if (sp.TPS_FIDs_CategoryIndex == category.TD_FID)
            return true

          if (category.children && category.children.length > 0) {
            for (var i = 0; i <= category.children.length - 1; i++) {
              if (category.children[i].TD_FID == sp.TPS_FIDs_CategoryIndex)
                return true
            }
          }
        })
    },
  }
};
