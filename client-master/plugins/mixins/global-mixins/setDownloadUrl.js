export default {
  methods: {
    setDownloadUrl(url) {
      const result = process.env.BASE_URL_SERVER +'/'+ url;
      return result;
    }
  }
};
