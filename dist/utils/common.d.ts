export default class {
    /**
     * 设置请求的userid
     * */
    setUserID: (e: string) => void;
    /**
     * 设置请求的url
     * */
    setUrl: (e: string) => void;
    /**
     * 设置请求开始结束
     * */
    setStatus: (e: boolean) => void;
    /**
     * 获取mac
     * */
    getMac: () => string;
    /**
     * 设置新的mac
     * */
    setMac(str: string): void;
    /**
     * 设置自定义的对象
     * */
    setObj(val: any): void;
    /**
     * 获取自定义的对象
     * */
    getObj(val: any): any;
    /**
     * 主动触发请求
     * */
    request(type: string, data: any): void;
    /**
     * 设置headers
     * */
    setHeaders(obj: any): void;
}
/**
 * 当前时间搓
 * */
export declare const timestamp: () => number;
/**
 * js节流
 * */
export declare function throttle(fn: any, delay: number): (...args: any) => void;
/**
 * 设置事件触发的时间
 * */
export declare function setDoTime(type: string): boolean;
/**
 * 发送请求，
 * */
export declare const request: (data: any, type?: string) => void;
