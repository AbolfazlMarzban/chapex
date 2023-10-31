import path from 'path'

import sharp, { Sharp } from 'sharp'

class Resizer {

  static resize = async (tag = '', imagePath, width) => {
    try {
      const imageName = Resizer.createFileName(imagePath, tag)
      

       await sharp(path.join(global.config.rootPath, imagePath))
        .resize(width).toFile(path.join(global.config.rootPath, imageName))

      // console.log('resize imageName', imageName);                                                                                                                                

      return imageName
    } catch (error) {
      console.log('resize error', error)
      return null
    }
  }

  static createFileName(filePathWithName, tag) {

    let file_path = path.dirname(filePathWithName);
    let file_name = path.basename(filePathWithName)
    
    let p = path.join(file_path, tag + '-' + file_name)
    return p
  }

}

export default Resizer