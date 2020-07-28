import service from "../utils/request";
/**
 * 获取验证码
 */
export function GetCity(data){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}