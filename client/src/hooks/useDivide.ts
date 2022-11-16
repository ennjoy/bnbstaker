export function useDivide(divide: number) {
    var int = String(Math.trunc(divide))

	if(int.length <= 3) return int

	var space = 0
	var number = ''

	for(var i = int.length - 1; i >= 0; i--) {
		if(space == 3) {
			number = ',' + number
			space = 0
		}
		number = int.charAt(i) + number
		space++
	}

	return number
}