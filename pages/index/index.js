//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var tmpFilePath

Page({
  data: {
     button_text: 'OH',
  },
  upload_pic: function(e) {
    var that = this
    // wx: wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     tmpFilePath = res.tempFilePaths
    //     that.setData({
    //       image_src: tmpFilePath[0]
    //     })
    //   }
    // })
    wx:wx.request({
      url: 'https://4gun.net/polls/',
      success: function(res) {
        that.setData({
          image_src: res.data
        })
      }
     })
    //  ,
    // this.setData({
    //   image_src: 'http://4gun.net/images/szj.jpg'
    // })
  },
  imageError: function (e) {
    util.toast('出错:' + e)
  }
})
