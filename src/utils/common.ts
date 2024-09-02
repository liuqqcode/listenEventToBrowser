import FingerprintJS from '@fingerprintjs/fingerprintjs'; // 浏览器指纹识别库
let md5 = require('md5')
import platform from "./environment"
import axios from "axios";

let userID = '' as string
let url = '' as string
let mac = '' as string
let status = false as boolean
let obj = {} as any
let headers = {} as any
let sign = '' as string
let startTime = window.performance.timeOrigin as number
let windowShowTime = window.performance.timeOrigin as number

let eventTime = {
  click: 0,
  mouseMove: 0,
  hide: 0,
  touchMove: 0,
  show: 0
} as any

// 对外暴露的方法，
export default class {
  
  /**
   * 设置请求的userid
   * */
  setUserID = (e: string) => {
    userID = e
  }
  
  /**
   * 设置请求的url
   * */
  setUrl = (e: string) => {
    url = e
  }
  
  /**
   * 设置请求开始结束
   * */
  setStatus = (e: boolean) => {
    status = e
  }
  
  /**
   * 获取mac
   * */
  getMac = () => {
    return mac
  }
  
  /**
   * 设置新的mac
   * */
  setMac(str: string) {
    mac = str
  }
  
  /**
   * 设置自定义的对象
   * */
  setObj(val: any) {
    obj = val
  }
  
  /**
   * 获取自定义的对象
   * */
  getObj() {
    return obj
  }
  
  /**
   * 主动触发请求
   * */
  request(obj: any, type: string) {
    this.setObj(obj)
    request('', type, 0)
  }
  
  /**
   * 设置headers
   * */
  setHeaders(obj: any) {
    headers = obj
  }
  
  /**
   * 设置sign
   * */
  setSign(obj: any) {
    sign = obj
  }
  
  /**
   * 设置当前时间为开始时间，刷新开始时间
   * */
  resetStartTime() {
    startTime = new Date().getTime()
  }
}

/**
 * 获取浏览器mac
 * */
const getMac = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  mac = result.visitorId
}
getMac().then()
/**
 * 当前时间搓
 * */
export const timestamp = () => {
  return new Date().getTime()
}

/**
 * js节流
 * */
export function throttle(fn: any, delay: number) {
  let lastExecutionTime = 0;
  return function (...args: any) {
    const currentTime = Date.now();
    if (currentTime - lastExecutionTime >= delay) {
      fn(...args);
      lastExecutionTime = currentTime;
    }
  };
}

/**
 * 设置事件触发的时间
 * */
export function setDoTime(type: string) {
  if (timestamp() - eventTime[type] > 10) {
    eventTime[type] = timestamp()
    return true
  } else {
    eventTime[type] = timestamp()
    return false
  }
}



/**
 * 发送请求，
 * */
export const request = (data: any, type: string, timeOut?:number) => {
  if (!status) {
    return
  }
  
  if (timeOut == 0) {
    postAxios()
  }else{
    setTimeout(() => {
      postAxios()
    }, timeOut)
  }
  for (let key in headers) {
    axios.defaults.headers.common[key] = headers[key]
  }
  function postAxios(){
    let tempObj = JSON.parse(JSON.stringify(obj))
    let year = new Date().getFullYear()
    let month:number|string = new Date().getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day:number|string = new Date().getDate()
    if (day< 10){
      day = '0' + day
    }
    let hour:number|string = new Date().getHours()
    if (hour<10){
      hour = '0' + hour
    }
    let minute:number|string = new Date().getMinutes()
    if (minute<10){
      minute = '0' + minute
    }
    let second:number|string = new Date().getSeconds()
    if (second<10){
      second = '0' + second
    }
    let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    let sessionId = ''
    try {
      sessionId = md5('' + windowShowTime)
    }catch (e) {
      sessionId = '' + windowShowTime
    }
    axios.post(url, {
      type,
      mac,
      userID,
      sign: md5(mac + time),
      sessionId,
      obj: tempObj,
      data: data,
      env: platform(),
      page: window.location.href,
      time: time,
      showTime: parseInt(String(new Date().getTime() - startTime))
    }).then()
    obj = {}
  }
}
