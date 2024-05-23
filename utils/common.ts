import FingerprintJS from '@fingerprintjs/fingerprintjs'; // 浏览器指纹识别库
import platform from './environment'
import axios from "axios";
let userID = '' as string
let url = '' as string
let mac = '' as string
let status = false as boolean
let obj = {} as any

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
  setUserID = (e:string) => {
    userID = e
  }
  
  /**
   * 设置请求的url
   * */
  setUrl = (e:string) => {
    url = e
  }
  
  /**
   * 设置请求开始结束
   * */
  setStatus = (e:boolean) => {
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
  setMac(str:string){
    mac = str
  }
  
  /**
   * 设置自定义的对象
   * */
  setObj(val:any) {
    obj = val
  }
  
  /**
   * 获取自定义的对象
   * */
  getObj(val:any) {
    return obj
  }
  
  /**
   * 主动触发请求
   * */
  request(type: string, data:any){
    request(data, type)
  }
}

/**
 * 获取浏览器mac
 * */
const getMac = async() => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const visitorId = result.visitorId
  mac = visitorId
}
getMac()
/**
 * 当前时间搓
 * */
export const timestamp = () => {
  return new Date().getTime()
}

/**
 * js节流
 * */
export function throttle(fn:any, delay:number) {
  let lastExecutionTime = 0;
  return function(...args:any) {
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
export function setDoTime(type:string){
  if (timestamp() - eventTime[type] > 10) {
    eventTime[type] = timestamp()
    return true
  }else {
    eventTime[type] = timestamp()
    return false
  }
}



/**
 * 发送请求，
 * */
export const request = (data:any, type?: string) => {
  if (!status){
    return
  }
  axios.post(url, {
    type,
    mac,
    userID,
    obj,
    data: data,
    env: platform(),
    page: window.location.href,
    time: timestamp(),
    showTime: parseInt(String(new Date().getTime() - window.performance.timeOrigin))
  }).then(res => {
  
  })
}
