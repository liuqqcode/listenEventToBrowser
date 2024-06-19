import {request, setDoTime} from "../common";

export default function (e:any){
    if (setDoTime('show')){
        request(e, 'show')
    }
}
