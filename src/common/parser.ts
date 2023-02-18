import chalk from 'chalk';

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
				console.log(i);
				console.log('Hello()World'.slice(0, 5));

				const error_message =
					str.slice(0, i) + chalk.bgRed(str[i]) + str.slice(i + 1, str.length);

				throw new Error(`Беcпарная ')' скобка ${i}\n ${error_message}`);
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
