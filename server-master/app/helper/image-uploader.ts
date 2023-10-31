// realtime image uploader handler for shop
const path = require("path");

// helper
import File from "./file";  

const mainHandle = async (state, options, status = "uploading", filePath = null) => {
  
  if (state == "user") {
    if (status == "uploading") {
      user.uploadHandle(options);  
      return user.path();
    } else if (status == "updating") {
      // just return success message
      return user.updateHandle();
    } else if (status == "validating") {
      return user.validation(filePath);
    }
  }

  else if (state == "optionIcon") {
    if (status == "uploading") {
      optionIcon.uploadHandle(options);
      return optionIcon.path();
    } else if (status == "updating") {
      // just return success message
      return optionIcon.updateHandle();
    } else if (status == "validating") {
      return optionIcon.validation(filePath);
    }
  }

  else if (state == "optionImage") {
    if (status == "uploading") {
      optionImage.uploadHandle(options);
      return optionImage.path();
    } else if (status == "updating") {
      // just return success message
      return optionImage.updateHandle();
    } else if (status == "validating") {
      return optionImage.validation(filePath);
    }
  }

  else if (state == "product") {
    if (status == "uploading") {
      product.uploadHandle(options);
      return product.path();
    }
    else if (status == "updating") {
      // just return success message
      return product.updateHandle();
    } else if (status == "validating") {
      return product.validation(filePath);
    }
  }

  else if (state == "pageSale") {
    if (status == "uploading") {
      pageSale.uploadHandle(options);
      return pageSale.path();
    } else if (status == "updating") {
      // just return success message
      return pageSale.updateHandle();
    } else if (status == "validating") {
      return pageSale.validation(filePath);
    }
  }
   else if(state == "advancedUploader"){
    if (status == "uploading") {
      advancedUploader.uploadHandle(options);
      return advancedUploader.path();
    } else if (status == "updating") {
      // just return success message
      return advancedUploader.updateHandle();
    } else if (status == "validating") {   
      return advancedUploader.validation(filePath);
    }
   } 
   else if(state == "salePageCategory"){
    if (status == "uploading") {
      salePageCategory.uploadHandle(options);
      return salePageCategory.path();
    } else if (status == "updating") {
      // just return success message
      return salePageCategory.updateHandle();
    } else if (status == "validating") {
      return salePageCategory.validation(filePath);
    }
   }
   else {
    return  path.join("public", "images", "generaltemp")
   }
};

const user = {
  uploadHandle: (options) => {
    try {
      // nothing to do ...
    } catch (error) {
      console.log(error);
    }
  },

  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },

  path: async () => {
    return path.join("public", "images", "user", "temp");
  },

  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
};

const optionIcon = {
  uploadHandle: (options) => {
    try {  
      // nothing to do ...
    } catch (error) {
      console.log(error);
    }
  },

  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },

  path: async () => {
    return path.join("public", "images", "options", "temp");
  },

  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
};
const pageSale = {
  uploadHandle: (options) => {
    try {
      // nothing to do ...
    } catch (error) {
      console.log(error);
    }
  },

  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },

  path: async () => {
    return path.join("public", "images", "pageSale", "temp");
  },

  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
};

const optionImage = {
  uploadHandle: (options) => {
    try {
      // nothing to do ...
    } catch (error) {
      console.log(error);
    }
  },

  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },

  path: async () => {
    return path.join("public", "images", "options", "temp");
  },

  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
};

const product = {
  uploadHandle: (options) => {
    try {
      // nothing to do ...


    } catch (error) {
      console.log(error);
    }
  },

  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },

  path: async () => {
    return path.join("public", "images", "product", "temp");
  },

  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
};
const advancedUploader = {
  uploadHandle : (options) => {
    try {
      // nothing to do ...


    } catch (error) {
      console.log(error);
    }
  }, 
  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },
  path: async () => {
    return path.join("public", "images", "pageSale", "temp");
  },
  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
}
const salePageCategory = {
  uploadHandle : (options) => {
    try {
      // nothing to do ...


    } catch (error) {
      console.log(error);
    }
  }, 
  updateHandle: async () => {
    const result = {
      mesages: ["فایل با موفقیت افزوده شد"],
      error: false,
    };
    return result;
  },
  path: async () => {
    return path.join("public", "images", "salePageCategory", "temp");
  },
  validation: (filePath: string) => {
    // let validationResult = {
    //   valid: true,
    //   message: ''
    // }
    // const imageSize = File.getFileSize_MB(filePath)
    // if (imageSize > global.imageSize.user.size) {
    //   validationResult.valid = false
    //   validationResult.message = 'حجم عکس نباید بیش از ' + global.imageSize.user.size_show + ' مگابایت باشد'
    // }
    // return validationResult
  },
}
export default mainHandle;
