import weCropper from '../../we-cropper/dist/weCropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
var app = getApp()
var util = require('../../utils/util.js')
var tmpFilePath
var uploadTask
var cutWidth = 148
var cutHeight = 252
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - cutWidth) / 2,
        y: (height - cutHeight) / 2,
        width: cutWidth,
        height: cutHeight
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  cancel() {
    console.log("cancel")
    wx.navigateBack({})
  },
  upload () {
    
    var that = this
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        console.log(avatar)
        uploadTask = wx.uploadFile({
          url: 'https://4gun.net/upload',
          filePath: avatar,
          name: 'uploadfile',
          formData: {
            'name': that.data.name,
            'colleges': that.data.colleges,
            'sex': that.data.sex,
            'degree': that.data.degree,
            'id_number': that.data.id_number,
            'date': that.data.date,
            'school': that.data.school,
          },
          success: function (res) {
            console.log('返回值:', res.data)
            console.log(res.statusCode)
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: '../xsz/xsz?image=' + res.data
              })
            } else{
              util.longtoast('因为穷买不起服务器，所以可能出了什么问题，建议洗个脸后再试一次')
            }
          },
          fall: function (res) {
            console.log('失败:', res.data)
            util.longtoast('因为穷买不起服务器，所以可能出了什么问题，建议洗个脸后再试一次')
          },
          complete: function (res) {
            that.setData({
              uploading: false
            })
          }
        })
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)

        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  onLoad(option) {
    this.setData({
      name: option.name,
      colleges: option.colleges,
      sex: option.sex,
      degree: option.degree,
      id_number: option.id_number,
      date: option.date,
      school: option.school
    })
    if(this.data.school == 1) {
      cutWidth = 160
      cutHeight = 202
      this.setData({
        cropperOpt: {
          id: 'cropper',
          width,
          height,
          scale: 2.5,
          zoom: 8,
          cut: {
            x: (width - cutWidth) / 2,
            y: (height - cutHeight) / 2,
            width: cutWidth,
            height: cutHeight
          }
        }
      })
    }

    console.log("name" + this.data.name)

    // do something
    const { cropperOpt } = this.data
    const { src } = option
    if (src) {
      Object.assign(cropperOpt, { src })

      new weCropper(cropperOpt)
        .on('ready', function (ctx) {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
    }
  }
})
