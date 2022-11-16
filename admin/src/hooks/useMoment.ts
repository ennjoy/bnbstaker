import moment from 'moment'

export function useMoment(date: string) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}