export function isRectangleMatrix(A: number[][]): boolean {
	let columns = A.length;
	const rows = A[0].length;

	for (const column of A) {
		if (column.length != rows) {
			return false;
		}
		columns--;
	}

	return columns === 0 ? true : false;
}

// console.log(isRectangleMatrix(A));
// console.log(isRectangleMatrix(B));
// console.log(isRectangleMatrix([[1]]));
