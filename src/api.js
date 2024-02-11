import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCrypto(){
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(cryptoData)
        }, 10)
    })
}

export function fakeFetchAssets(){
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(cryptoAssets)
        }, 10)
    })
}