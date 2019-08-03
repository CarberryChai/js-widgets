window.addEventListener(
  'error',
  function(e) {
    const target = e.target
    const tagName = target.tagName
    const times = Number(target.dataset.times) || 0
    const totalTime = 3
    // 监听图片的error事件，这里用到了事件代理，在window上监听
    if (tagName.toUpperCase() === 'IMG') {
      // 定义一个次数，小于按图片地址错误处理，大于就可能是网络错误，避免死循环给图片一个base64地址
      if (times < totalTime) {
        target.dataset.times++
        target.src = 'http://xxx.png'
      } else {
        target.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
    }
  },
  true
)
