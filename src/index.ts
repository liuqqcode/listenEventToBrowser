import click from "./utils/watch/click"
// import event from "./utils/watch/event";
import hide from "./utils/watch/hide";
import move from "./utils/watch/move";
import show from "./utils/watch/show";
import common, { throttle } from "./utils/common"

export declare interface initFace {
  ids?: any
  url: string
  userID?: string
  timeOut?: number
  headers?: any,
  showHide?: boolean
  touchmove?: boolean
}

export default class extends common {
  private ids: Array<any> = []
  private time: number = 1000; // 节流的间隔时间
  private showHide: boolean = false
  private touchmove: boolean = true

  /**
   * 初始化
   * */
  init({ ids, url, userID, timeOut, headers, showHide, touchmove}: initFace) {
    let that = this
    that.ids = ids
    that.time = timeOut || 1000
    that.showHide = showHide
    that.touchmove = touchmove
    this.setUserID(userID || '')
    this.setUrl(url)
    this.setHeaders(headers)
  }

  start() {
    let that = this
      this.setStatus(true)
    /**
     * 监听页面显示 隐藏
     * */
    document.addEventListener('visibilitychange', throttle(function () {
      if (document.visibilityState === "hidden" && that.showHide) {
        hide('hide')
      }
      if (document.visibilityState === "visible" && that.showHide) {
        show('show')
      }
    }, 100), true)

    /**
     * 监听鼠标移动事件
     * */
    // document.addEventListener('mousemove', throttle(function(e:any) {
    //   event(e)
    // }, that.time), true);

    /**
     * 监听鼠标点击事件
     * */
    document.addEventListener('click', function (e: any) {
      if (!that.ids || that.ids?.length == 0) {
        click(e.target)
      }
    }, true);

    /**
     * 监听手指滑动
     * */
    document.addEventListener('touchmove', throttle(function (e: any) {
      if (that.touchmove) {
        move(JSON.stringify({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }))
      }
    }, that.time), true);

    /**
     * 监听点击 id
     * */
    that.ids?.forEach(item => {
      let HTMLID: any = document.getElementById(item)
      if (HTMLID) {
        HTMLID.addEventListener('click', function (e: any) {
          click(e.target)
        }, true)
      }
    })
  }
  end() {
    this.setStatus(false)
  }
}
