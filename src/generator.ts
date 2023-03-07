import { encodeToWindows1251 } from './common/encodeToWindows1251';
import { Arc, Circle, LineXML, LinePath, Rotate, TFigure } from './figures';
import { writeFile } from 'node:fs';
import { exec } from 'node:child_process';

export interface IGenerate {
	name: string;
	primitives: TFigure[];
	params: string;
}

export function generate({ name, primitives, params }: IGenerate): void {
	const xml_1 = primitives.reduce((prev, curr) => prev + '' + curr + '', '');

	const output = `
<?xml version="1.0" encoding="windows-1251"?>		
<template name="${name}">
	${params}
<geom>
		${xml_1}
</geom>
</template>
		`;

	exec('ls ../templates', (std_out, err) => {
		console.log(std_out);
		console.log(err);
	});
	writeFile(`../templates/${name}.template`, encodeToWindows1251(output), (err) => {
		// if (err) throw err;

		console.log(`file: "../templates/${name}.temp" created`);
	});
}
