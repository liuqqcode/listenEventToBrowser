import {request, setDoTime} from "../common";

export default function (e:any){
    if (setDoTime('touchMove')){
        request(e, 'touchMove')
    }
}
