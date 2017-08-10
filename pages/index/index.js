//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var tmpFilePath
var uploadTask


Page({
  data: {
     button_text: '生成学生证',
     name : "老王",
     colleges: "家里系",
     sexIndex: 0,
     sexList: ["男", "女", "妖"],
     degreeIndex: 0,
     degreeList:["本科生", "硕士生", "博士生"],
     id_number: "2017000001",
     date: "2017",
  }, bindNameInput: function(e) {
    this.setData({
      name: e.detail.value,      
    })
  }, bindIdInput: function (e) {
    this.setData({
      id_number: e.detail.value,
    })
  }, bindCollegesInput: function(e) {
    this.setData({
      colleges: e.detail.value,
    })
  }, bindSexChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  }, bindDegreeChange: function (e) {
    this.setData({
      degreeIndex: e.detail.value
    })
  }, bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },  upload_pic: function(e) {
    var that = this
    wx: wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tmpFilePath = res.tempFilePaths
        uploadTask = wx.uploadFile({
          url: 'https://4gun.net/upload',
          filePath: res.tempFilePaths[0],
          name: 'uploadfile',
          formData: {
            'name': that.data.name,
            'colleges': that.data.colleges,
            'sex': that.data.sexList[that.data.sexIndex],
            'degree': that.data.degreeList[that.data.degreeIndex],
            'id_number': that.data.id_number,
            'date': that.data.date
          },
          success: function (res) {
            console.log('返回值:', res.data)
            that.setData({
              image_src: res.data
            })
          }
        })
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      }
    })

    uploadTask
   
    //  ,
    // this.setData({
    //   image_src: 'http://4gun.net/images/szj.jpg'
    // })
  },
  imageError: function (e) {
    util.toast('出错:' + e)
  }
})
