import Cookies from "js-cookie";
import { IAuthResponse, ITokens } from "@store/user/user.inteface";

export const saveTokensStorage = (data:ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
}

export const saveToStorage = (data: IAuthResponse) => {
    localStorage.setItem('user', JSON.stringify(data?.user))
    saveTokensStorage(data)
}

export const removeToekensStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
}