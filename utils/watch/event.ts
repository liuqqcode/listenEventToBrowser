import {request, setDoTime} from "../common";

export default function (e:any){
    if (setDoTime('mouseMove')){
        request(e, 'mouseMove')
    }
}
