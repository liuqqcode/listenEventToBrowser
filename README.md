一、安装

`npm i watchbrowser`

二、引入项目

```
import watchBrowser from watchbrowser
const watchEvent = new watchBrowser()
watchEvent.init({
  ids: array, // 需要监听的元素id，不传监听全部页面
  url: string, // 上传接口地址，统一post
  userID: string, // 操作用户id
  timeOut: number, // 节流时间，默认1000
  headers: any, // 接口请求headers
})
```

三、暴露方法

    start(); // 开始
    end(); // 结束
    getMac(); // 获取mac地址
    setMac(string); // 设置mac地址
    setUserID(str); // 设置用户id
    setUrl(str); // 设置提交的url
    setObj({}); // 设置提交的自定义obj，如果已经有obj，先getObj拿到数据再提交
    getObj(); // 获取自定义数据的obj
    request(tpye:string, data:any); // 触发请求，type:类型， data:主动提交的数据
    setHeaders(headers:any); // 设置headers

四、提交数据解释

    data: 触发请求的数据
    env: 环境
    mac: 唯一标识
    obj: 自定义数据
    page: 当前页面
    showTime: 触发提交的时间距离打开页面的时间差，展示时间
    time: 当前时间戳
    type: 触发的事件
    userID：用户id

