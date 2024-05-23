const ua = navigator.userAgent.toLowerCase();

export default function (){
  const isWeixin = ua.indexOf('micromessenger') !== -1;
  const isInApp = /(^|;\s)app\//.test(ua);
  if (isWeixin) {
    if ((window as any).__wxjs_environment === 'miniprogram') {
      return 'wxapp';
    } else {
      return 'wxh5';
    }
  } else {
    if (!isInApp) {
      return 'browser';
    } else {
      return 'app';
    }
  }
}
