export function useFormatDate(date: any) {
    date = parseInt(date)

    if (date < 1600000000000) {
        date *= 1000
    }
    
    return new Date(date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}