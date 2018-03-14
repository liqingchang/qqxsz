// pages/xsz/xsz.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      image_src:"",
      downloading: false
  },
  onPicClick: function(e) {
    console.log("PicClick")
    wx.previewImage({
      urls: [this.data.image_src],
    })
  }, onSaveClick: function(res) {
    var that = this
    that.setData({
      downloading: true
    }),
    wx.downloadFile({
      url: that.data.image_src, 
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log("保存成功")
            util.toast("保存成功")
          }, fail(res) {
            console.log("保存失败")
            console.log(res)
            util.toast("保存失败")
          }, complete(res) {
            that.setData({
              downloading: false
            })
          }
        })
      }, complete: function(res) {
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        image_src: options.image
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '../index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})