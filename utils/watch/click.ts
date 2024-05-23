import {request, setDoTime} from "../common";

export default function (e:any){
    if (setDoTime('click')){
        let updateStr = e
        let obj = {}
        if (e.localName === 'input') {
            obj = {
                element: 'input',
                value: e._value
            }
            updateStr = JSON.stringify(obj)
        }else {
            obj = {
                element: e.localName,
                value: e.innerText
            }
            updateStr = JSON.stringify(obj)
        }
        request(updateStr, 'click')
    }
}
