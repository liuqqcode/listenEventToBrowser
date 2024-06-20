import common from "./utils/common";
export declare interface initFace {
    ids?: any;
    url: string;
    userID?: string;
    timeOut?: number;
    headers?: any;
    showHide?: boolean;
    sign?: string;
}
export default class extends common {
    private ids;
    private time;
    private showHide;
    /**
     * 初始化
     * */
    init({ ids, url, userID, timeOut, headers, showHide, sign }: initFace): void;
    start(): void;
    end(): void;
}
