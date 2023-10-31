export default {
  methods: {
    async get(mode, id = 0) {
      try {
        const response = await this.$authAxios.$get(
          `/report/get/${id}?mode=${mode}`
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getGoods() {
      try {
        const response = await this.$authAxios.$get(
          "/products/goods/get/0?mode=table"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async getChart(goodsId, timeRange, priceType) {
      try {
        const response = await this.$authAxios.$get(
          `/report/getChart/${goodsId}/${timeRange}/${priceType}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

  },
}

