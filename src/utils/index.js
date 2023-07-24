export const debounce = function (fn, time){
    let timeout = null
    return function(){
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            fn()
        }, time)
    }
}

export const throttle = function (fn, time){
    let able = true
    return function(){
        if(!able)
            return
        else{
            able = false
            setTimeout(()=>{
                fn()
                able = true
            }, time)
        }
    }
}
