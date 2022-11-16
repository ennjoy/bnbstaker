export function useCountDown(end: number, combine = 0, ms = 0) {
    if (end < 100)
        return "No record"

    if (end < 16e10)
        end *= 1e3

    let now = new Date().getTime()
    let timeleft = end - now

    timeleft = timeleft < 0 ? now - end : timeleft
    if (ms != 0)
        return timeleft

    let days: any = Math.floor(timeleft / (1000 * 60 * 60 * 24))
    let hours: any = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes: any = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
    let seconds: any = Math.floor((timeleft % (1000 * 60)) / 1000)

    hours = (days * 24) + hours

    if (hours < 10)
        hours = "0" + hours

    if (minutes < 10)
        minutes = "0" + minutes

    if (seconds < 10)
        seconds = "0" + seconds

    if (timeleft <= 0)
        return 0

    if (isNaN(hours))
        return "No record"
    
        return combine == 1 ? hours + ":" + minutes + ":" + seconds : {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}