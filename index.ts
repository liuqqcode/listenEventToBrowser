import click from './utils/watch/click'
import event from "./utils/watch/event";
import hide from "./utils/watch/hide";
import move from "./utils/watch/move";
import show from "./utils/watch/show";
import common, { throttle } from "./utils/common"

interface initFace {
  ids?: any
  url: string
  userID?: string
  timeOut?:number
}

export default class extends common {
  private ids:Array<any> = []
  private time:number = 1000; // 节流的间隔时间
  
  /**
   * 初始化
   * */
  init({ids, url, userID, timeOut}: initFace) {
    let that = this
    that.ids = ids
    that.time = timeOut || 1000
    this.setUserID(userID || '')
    this.setUrl(url)
  }
  
  start() {
    let that = this
    this.setStatus(true)
    /**
     * 监听页面显示 隐藏
     * */
    document.addEventListener('visibilitychange', throttle(function (e:any){
      if (document.visibilityState === "hidden") {
        hide('hide')
      }
      if (document.visibilityState === "visible") {
        show('show')
      }
    },100), true)
    
    /**
     * 监听鼠标移动事件
     * */
    // document.addEventListener('mousemove', throttle(function(e:any) {
    //   event(e)
    // }, that.time), true);
    
    /**
     * 监听鼠标点击事件
     * */
    document.addEventListener('click', function(e:any) {
      console.log(e)
      if (!that.ids || that.ids?.length == 0){
        click(e.target)
      }
    }, true);
    
    /**
     * 监听手指滑动
     * */
    document.addEventListener('touchmove', throttle(function(e:any) {
      move(JSON.stringify({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }))
    }, that.time), true);
    
    /**
     * 监听点击 id
     * */
    that.ids?.forEach(item => {
      let HTMLID:any = document.getElementById(item)
      console.log(HTMLID)
      if (HTMLID) {
        HTMLID.addEventListener('click', function (e:any) {
          click(e.target)
        }, true)
      }
    })
  }
  end() {
    this.setStatus(false)
  }
}
