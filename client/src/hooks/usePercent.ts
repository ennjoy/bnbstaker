
export function usePercent(number: number) {
    return number + ((number * 5 / 100) * import.meta.env.VITE_ITERATION)
}