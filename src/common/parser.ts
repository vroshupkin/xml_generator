export const checkBracker = (str: string): boolean => {
	const openBracket = [];

	let i = 0;
	for (const ch of str) {
		if (ch === '(') {
			openBracket.push(i);
		}
		if (ch === ')') {
			if (openBracket.length > 0) {
				openBracket.pop();
			} else {
				throw new Error(`Беcпарная ')' скобка ${i}\n ${str}`);
			}
		}
		i++;
	}
	if (openBracket.length > 0) {
		throw new Error(
			`Лишние скобки на индексах: ${openBracket}. Или не достает скобок \n ${str}`,
		);
	}

	return true;
};
