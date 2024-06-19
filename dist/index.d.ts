import common from "./utils/common";
export declare interface initFace {
    ids?: any;
    url: string;
    userID?: string;
    timeOut?: number;
    headers?: any;
}
export default class extends common {
    private ids;
    private time;
    /**
     * 初始化
     * */
    init({ ids, url, userID, timeOut, headers }: initFace): void;
    start(): void;
    end(): void;
}
