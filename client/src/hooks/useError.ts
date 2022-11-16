export function useError(message: string) {
    return message.toUpperCase().replace(/ /ig, '_')
}