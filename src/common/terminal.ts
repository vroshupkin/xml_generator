import { exec } from 'node:child_process';

// any callback
export function clearDirTemplate(callback: any): boolean {
	exec('ls ../templates/*.template', (_, stdout) => {
		const dir = stdout.split('\n');
		if (dir.length) {
			exec('rm ../templates/*.template', () => {
				let sentence = '';
				if (dir.length === 1) {
					sentence = `Удален ${dir.length} шаблон`;
				} else if (dir.length < 5) {
					sentence = `Удалены ${dir.length} шаблона`;
				} else {
					sentence = `Удалены ${dir.length} шаблонов`;
				}

				console.log(sentence);
				callback();
			});
		}
	});

	return true;
}

export function cpToTemplate_1_9(): void {
	exec('cp ../templates/1-9/* ../templates/');
}
