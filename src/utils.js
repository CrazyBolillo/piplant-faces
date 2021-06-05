export function unixToHumanTime(unixTime) {
    if (typeof unixTime !== 'number') {
        return ''
    }

    const date = new Date(unixTime * 1000)
    let minutes = date.getMinutes()
    if (minutes < 10) {
       minutes = `0${minutes}`
    }
    let seconds = date.getSeconds()
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return `${date.getHours()}:${minutes}:${seconds}`
}