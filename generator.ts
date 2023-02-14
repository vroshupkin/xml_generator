import { encodeToWindows1251 } from './src/common/encodeToWindows1251';
import { Arc, Circle, LineXML, LinePath, Rotate } from './src/primitives';
import { writeFile } from 'node:fs';

export interface IGenerate {
	name: string;
	primitives: (LineXML | Arc | Circle | LinePath | Rotate)[];
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

	writeFile(`../templates/${name}.template`, encodeToWindows1251(output), (err) => {
		if (err) throw err;

		console.log(`file: "../templates/${name}.temp" created`);
	});
}
