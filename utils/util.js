function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 显示内容
 */
function toast(msg){
  wx.showToast({
    title: msg,
    duration: 2000
  })
}

/**
 * 显示内容
 */
function longtoast(msg) {
  wx.showToast({
    title: msg,
    duration: 5000
  })
}

module.exports = {
  formatTime: formatTime,
  toast: toast,
  longtoast:longtoast
}
