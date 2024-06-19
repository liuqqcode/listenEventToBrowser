import {request, setDoTime} from "../common";

export default function (e:any){
    if (setDoTime('hide')){
        request(e, 'hide')
    }
}
