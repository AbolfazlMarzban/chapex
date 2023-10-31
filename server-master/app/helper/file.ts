import path from 'path'
import fs, { stat } from 'fs'

import filesize from "filesize";
const ExifImage = require('exif').ExifImage;

import Resizer from './resizer'

let RootPath: string = global.config.rootPath

const File = {

  writeLog: (log) => {
    const logPath = path.join(RootPath, 'tmp', 'log' + Date.now().toString() + '.txt')

    fs.writeFileSync(logPath, log)

  },

  removeImage: (imagePath) => {
    const imgPath = path.join(RootPath, imagePath)
    if (imagePath) {
      const exist = fs.existsSync(imgPath)
      if (exist) {
        fs.unlinkSync(imgPath)
      }
    }
  },


  // File images functionality
  // req.file needed
  removeImages: (imageArray = []) => {
    for (const files of imageArray) {
      fs.unlink(path.join(RootPath, files.path), (err => {
        console.log(err)
      }))
    }
  },

  // File images functionality
  removeImagesWithPaths: (pathArray = []) => {
    for (const imagePath of pathArray) {
      if (imagePath) {
        if (imagePath.length > 1) {
          const exists = fs.existsSync(path.join(RootPath, imagePath))
          if (exists) {
            fs.unlink(path.join(RootPath, imagePath), (err => {
              console.log(err)
            }))
          }
        }
      }
    }
  },

  // File functionality
  removeDirectory: (path, force = true) => {
    fs.exists(path, exist => {
      if (exist) {
        fs.rmdirSync(path, {
          recursive: force
        })
      }
    })
  },

  // File
  createDirectoryIfNotExits: (path, force = true) => {
    const exist = fs.existsSync(path)
    if (!exist) {
      fs.mkdirSync(path, {
        recursive: force
      })
    }
  },

  // createDirectoryIfNotExitsAsync:  (path, force = true) => {
  //   fs.exists(path, async exist => {
  //     if (!exist) {
  //       await fs.mkdirSync(path, { recursive: force })
  //     }

  //   })
  // },

  // handle Images for editor
  // handle multiple images with field names in DB
  // use in category and product controller
  handleImagesRequset: (files, data, imageFiledsName, mode = 'Insert') => {
    if (mode == "Update") {
      console.log("update")
      for (const filedName in imageFiledsName) {

        if (data[filedName]) {
          for (let file in files) {
            if (files[file][0].fieldname == filedName && files[filedName]) {
              File.removeImage(data[filedName])
              data[filedName] = files[file][0].path
            }
          }
        } else {

          File.removeImage(imageFiledsName[filedName])
          for (let file in files) {
            if (files[file][0].fieldname == filedName && files[filedName][0]) {
              data[filedName] = files[file][0].path
            }
          }
        }
      }
    } else if (mode == 'Insert') {
      console.log("insert")

      for (let fileName in files) {
        if (files[fileName]) {
          if (data[fileName]) {
            File.removeImage(data[fileName])
          }
          data[fileName] = files[fileName][0].path
        }

      }
    }

    return data
  },

  // use for clearing image when validation errors occured
  handleImageRequset: (file, data, imageFiledName) => {
    console.log("delete")

    if (file) {
      if (data[imageFiledName]) {
        File.removeImage(data[imageFiledName])
        data[imageFiledName] = file.path
      }
    } else {
      if (data[imageFiledName]) {
        File.removeImage(data[imageFiledName])
      }
    }
    return data
  },

  handleEditorImages: (state, newFolderName, imagePaths) => {
    let result = false

    if (imagePaths.length > 0 && imagePaths[0] !== '') {
      const dirExists = fs.existsSync('public/images/' + state + '/' + newFolderName)
      if (!dirExists) {
        fs.mkdirSync('public/images/' + state + '/' + newFolderName)
      }

      let editorImagesWithNewPath = []
      for (let imagePath of imagePaths) {
        editorImagesWithNewPath.push(imagePath.replace('temp', newFolderName))
      }
      for (let i = 0; i < imagePaths.length; i++) {
        File.moveFile(imagePaths[i], editorImagesWithNewPath[i])
      }
      result = true
    }
    return result
  },

  // rename temp image path in html text
  renameImagePathInHtmlText: (htmlText, renameText) => {
    let newHtmlText = ''
    for (let i = 0; i < htmlText.length; i++) {
      let letter = htmlText[i]
      if (htmlText[i] == "t") {
        if (htmlText[i + 1] == "e") {
          if (htmlText[i + 2] == "m") {
            if (htmlText[i + 3] == "p") {
              i += 4
              letter = renameText + '/'
            }
          }
        }
      }
      newHtmlText += letter
    }
    return newHtmlText
  },

  moveFile(path, newPath) {
    const exist = fs.existsSync(path)
    if (exist) {
      fs.renameSync(path, newPath)
    }
  },


  // مدیریت عکس  با استفاده از کامپوننت realTime 
  RealTimeImageHandler(action, state, data, fieldsName, oldData) {
    if (action == "update") {
      for (let fieldName of fieldsName) {
        if (data[fieldName]) {
          if (oldData[fieldName]) {
            if (oldData[fieldName] != data[fieldName]) {
              File.removeImage(oldData[fieldName])
              // and deleting resized images
              this.DeleteResizeRealTime(oldData[fieldName], state)
            }
          }
          const newPath = File.createCorrectNameForImage(state, data[fieldName])
          if (data[fieldName]) {
            File.moveFile(data[fieldName], newPath)
            data[fieldName] = newPath
            // and resizing images
            this.ResizeRealTime(newPath, state)

          }
        } else {
          if (oldData[fieldName]) {
            File.removeImage(oldData[fieldName])
            // and deleting resized images
            this.DeleteResizeRealTime(oldData[fieldName], state)

          }
        }
      }

    } else if (action == "insert") {
      for (let fieldName of fieldsName) {
        if (data[fieldName]) {
          const newPath = this.createCorrectNameForImage(state, data[fieldName])
          File.moveFile(data[fieldName], newPath)
          data[fieldName] = newPath
          // resize
          this.ResizeRealTime(newPath, state)
        }
      }
    }
    return data
  },

  // نام گذاری ادرس عکس بر اساس state تعریف شده
  createCorrectNameForImage(state, filename, TPIC_FName: string = '') {

    if (TPIC_FName.indexOf(' ') > -1) {
      TPIC_FName = TPIC_FName.replace(/ /g, '-')
    }


    let ret_path
    if (state == "user") {
      ret_path = filename.replace(/\\temp-/, '\\' + '-')
      ret_path = ret_path.replace(/\\temp/, '')
    }
    if (state == "category") {
      ret_path = filename.replace(/\\temp-/, '\\' + '-')
      ret_path = ret_path.replace(/\\temp/, '')
    }

    if (state == "optionIcon") {
      ret_path = filename.replace(/\\temp-/, '\\' + '-')
      ret_path = ret_path.replace(/\\temp/, '')
    }

    if (state == "optionImage") {
      // ret_path = filename.replace(/\\temp-/, '\\' + data.TD_FID + '-image' + '-')
      // ret_path = ret_path.replace(/\\temp/, '')

      let file_path = path.dirname(filename);
      file_path = file_path.replace('/temp', '')
      file_path = file_path.replace('\\temp', '')

      let file_name = path.basename(filename)
      file_name = file_name.replace('temp-', TPIC_FName + '-')

      ret_path = path.join(file_path, file_name)
    }

    if (state == "product") {
      let file_path = path.dirname(filename);
      file_path = file_path.replace('/temp', '')
      file_path = file_path.replace('\\temp', '')

      let file_name = path.basename(filename)
      file_name = file_name.replace('temp-', TPIC_FName + '-')

      ret_path = path.join(file_path, file_name)
    }

    if (state == "pageSale") {

      let file_path = path.dirname(filename);
      file_path = file_path.replace('/temp', '')
      file_path = file_path.replace('\\temp', '')

      let file_name = path.basename(filename)
      file_name = file_name.replace('temp-', TPIC_FName + '-')

      ret_path = path.join(file_path, file_name)
    }
    if(state == "salePageCategory"){
      let file_path = path.dirname(filename);
      file_path = file_path.replace('/temp', '')
      file_path = file_path.replace('\\temp', '')

      let file_name = path.basename(filename)
      file_name = file_name.replace('temp-', TPIC_FName + '-')

      ret_path = path.join(file_path, file_name)
    }
    return ret_path
  },


  // image resize for realTime
  async ResizeRealTime(imagePath, state) {
    try {

      if (state == 'user') {
        await Resizer.resize('sm', imagePath, global.imageSize.user.sm)
      }
      //  else if (state == 'category') {
      //   await Resizer.resize('sm', imagePath, 200)
      //   await Resizer.resize('md', imagePath, 500)
      //   await Resizer.resize('lg', imagePath, 800)
      // } else if (state == 'product') {
      //   await Resizer.resize('sm', imagePath, 200)
      //   await Resizer.resize('md', imagePath, 500)
      //   await Resizer.resize('lg', imagePath, 800)
      // }
    } catch (error) {
      console.log(error)
    }
  },

  // image resize for realTime
  DeleteResizeRealTime(imagePath, state) {

    if (state == 'user') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
    } else if (state == 'category') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'md'))
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'lg'))

    } else if (state == 'product') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'md'))
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'lg'))
    }
    else if (state == 'optionIcon') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
    }
    else if (state == 'optionImage') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
    }
    else if (state == 'pageSale') {
      File.removeImage(this.setPrefixForImageNameInImagePath(imagePath, 'sm'))
    }

  },



  // set prefix name for images with resize
  setPrefixForImageNameInImagePath(imagePath, prefix) {
    const baseName = imagePath.split('\\').reverse()[0]
    let imageName = prefix + "-" + imagePath.split('\\').reverse()[0]
    const path = imagePath.replace(baseName, imageName)
    return path
  },

  getImageInfo(filePath) {
    const promise = new Promise((resolve, reject) => {
      const imgPath = path.join(RootPath, filePath)
      new ExifImage({
        image: imgPath
      }, function (error, exifData) {
        if (error)
          reject()
        else
          resolve(exifData); // Do something with your data!
      });
    })
    return promise
  },

  getFileSize_MB(filePath: string, round = 3) {
    let fileExist = fs.existsSync(filePath)

    if (fileExist) {
      let fileState = fs.statSync(filePath)

      const fileDetail = filesize(fileState.size, {
        round,
        exponent: 2
      })


      let size = fileDetail.split(' ')[0]
      let type = fileDetail.split(' ')[1]
      return Number(size)
    }
  }

}

export default File