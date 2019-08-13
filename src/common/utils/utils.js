export const getArticleDate = (timesData) => {
    const dateBegin = new Date(timesData)
    const dateEnd = new Date()
    const dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
    const leave1 = dateDiff % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
    //计算相差分钟数
    const leave2 = leave1 % (3600 * 1000)    // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
    //计算相差秒数
    const leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000)
    let timesString = ''

    if (dayDiff != 0) {
        timesString = dayDiff + '天之前'
    } else if (dayDiff == 0 && hours != 0) {
        timesString = hours + '小时之前'
    } else if (dayDiff == 0 && hours == 0) {
        timesString = minutes + '分钟之前'
    }

    return timesString
}

export const throttle = (func, wait, assignTime) => {
    let timerId = ''
    let startTime = new Date()
    return () => {
        let nowTime = new Date()
        clearTimeout(timerId)
        if (nowTime - startTime < assignTime) {
            timerId = setTimeout(func, wait)
            return
        }
        func()
        startTime = nowTime
    }
}