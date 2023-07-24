import {nanoid} from "nanoid";
export const getID = ()=>{
    let nanoid_token = localStorage.getItem('NANOIDTOKEN')
    if(!nanoid_token){
        nanoid_token = nanoid()
        localStorage.setItem('NANOIDTOKEN', nanoid_token)
    }
    return nanoid_token
}