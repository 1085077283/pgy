import {fetch,post,patch,put} from './http'

export const chargeList = (param)=>{
    return post('/backend/charge-details/charge-list',param)
}

export const listAuthGet = (param)=>{
    return fetch('/backend/Menuauth/listAuthGet',param)
}

export const loanAuditList = (param)=>{
    return fetch('/backend/order/order-list',param)
}

export const loginIn = (param) =>{
    return post('/backend/Login/login',param)
} 

export const getOrderOne = (param) =>{
    return fetch('/backend/order/order-one',param)
}

