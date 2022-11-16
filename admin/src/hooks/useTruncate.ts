export function useTruncate(fullString: string, stringLen: number, separator?: string) {
    if (fullString.length <= stringLen) return fullString
  
    separator = separator || '...'
  
    var sepLen = separator.length,
        charsToShow = stringLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2)
  
    return fullString.substr(0, frontChars) + 
           separator + 
           fullString.substr(fullString.length - backChars)
  }