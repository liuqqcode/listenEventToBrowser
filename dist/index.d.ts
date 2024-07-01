import common from "./utils/common";
export declare interface initFace {
    ids?: any;
    url: string;
    userID?: string;
    timeOut?: number;
    headers?: any;
    showHide?: boolean;
    touchmove?: boolean;
}
export default class extends common {
    private ids;
    private time;
    private showHide;
    private touchmove;
    /**
     * 初始化
     * */
    init({ ids, url, userID, timeOut, headers, showHide, touchmove }: initFace): void;
    start(): void;
    end(): void;
}
