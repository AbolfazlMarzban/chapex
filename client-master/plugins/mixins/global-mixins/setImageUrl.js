import path from "path"
import axios from "@nuxtjs/axios"

export default {
  methods: {
    setImageUrl(imagePath, prefix = "") {
      if (imagePath == "") {
        imagePath = "/placeholder.png";
      } else {
        if (prefix) {
          imagePath = this.createPathWithPrefix(imagePath, prefix);
        }
      }

      if (imagePath == "/placeholder.png") {
        return imagePath;
      }
      if(imagePath && !imagePath.includes('http')){
        return process.env.BASE_URL_SERVER + '/' + imagePath;
      } else{
        return imagePath
      }
    },

    createPathWithPrefix(imagePath, prefix) {

      imagePath = imagePath.replaceAll('\\', '/')
      imagePath = path.normalize(imagePath)

      const baseName = path.basename(imagePath)
      let imageName = prefix + "-" + baseName;

      // console.log('imagePath before', imagePath);
      const path1 = imagePath.replace(baseName, imageName);

      // console.log('imagePath after', path1);
      // var http = this.axios.$get(path1)
      // console.log('http', http)
      return path1;
    },

    normalize(imagePath){
      if(imagePath){
        imagePath = imagePath.replaceAll('\\', '/',)
        imagePath = path.normalize(imagePath)
        return imagePath
      }
    },

    setImageUrlWithoutPlaceholder(imagePath, iconPLaceholder = "", prefix) {
      if (imagePath) {
        if (prefix) {
          imagePath = this.createPathWithPrefix(imagePath, prefix);
        }
      } else return "/" + iconPLaceholder + ".png";

      return process.env.BASE_URL_SERVER + "/" + imagePath;
    }
  }
};
