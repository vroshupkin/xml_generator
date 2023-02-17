import { coordinate, IFigureOperation } from './figure.interface';

export type TFigure = LineXML | Arc | Circle | LinePath | Rotate | Arc_3points;
export class Arc {
	/**
	 * @param start_point [coord, coord]
	 * @param radius [мм]
	 * @param startAngle [радиан]
	 * @param endAngle [радиан]
	 * @param clockwise
	 */
	constructor(
		private start_point: [coordinate, coordinate],
		private radius: string | number,
		private startAngle: string | number,
		private endAngle: string | number,
		private clockwise: boolean = true,
	) {}

	toString(): string {
		return `
    <arc 
        R="${this.radius}" 
        start="${this.startAngle}"
        end="${this.endAngle}"
        clockwise="${this.clockwise}"
    >
        <point>
            <x>${this.start_point[0]}</x>
            <y>${this.start_point[1]}</y>
        </point>
    </arc>
`;
	}
}

/**
 * Дуга по 3 точкам
 */
export class Arc_3points {
	/**
	 * @param radius [мм]

	 * @param clockwise
	 */
	constructor(
		private p0: [coordinate, coordinate],
		private p1: [coordinate, coordinate],
		private p2: [coordinate, coordinate],
	) {}

	toString(): string {
		return `
    <arc >
        <point>
            <x>${this.p0[0]}</x>
            <y>${this.p0[1]}</y>
        </point>
		<point>
            <x>${this.p1[0]}</x>
            <y>${this.p1[1]}</y>
        </point>
		<point>
            <x>${this.p2[0]}</x>
            <y>${this.p2[1]}</y>
        </point>
    </arc>
`;
	}
}

export class LineXML {
	constructor(private p1: [coordinate, coordinate], private p2: [coordinate, coordinate]) {}

	toString(): string {
		return `
<seg>
    <point>
        <x>${this.p1[0]}</x>
        <y>${this.p1[1]}</y>
    </point>
    
    <point>
        <x>${this.p2[0]}</x>
        <y>${this.p2[1]}</y>
    </point>
</seg>
`;
	}
}

export class Circle {
	constructor(private point: [coordinate, coordinate], private radius: string | number) {}

	toString(): string {
		return `
<circle
    R="${this.radius}" 
>
    <point>
        <x>${this.point[0]}</x>
        <y>${this.point[1]}</y>
    </point>
</circle>
`;
	}
}

export function linePath(coordinates: [coordinate, coordinate][]): LineXML[] {
	if (coordinates.length <= 1) {
		throw `Минимальное количество координат 2. Передано: ${coordinates.length}`;
	}

	const lines: LineXML[] = [];

	let i = 1;
	while (i < coordinates.length) {
		const coord_1 = coordinates[i - 1];
		const coord_2 = coordinates[i];
		lines.push(new LineXML(coord_1, coord_2));
		i++;
	}

	return lines;
}

export class LinePath implements IFigureOperation {
	constructor(private coordinates: [coordinate, coordinate][]) {}

	toString(): string {
		let out = ``;

		let i = 1;
		while (i < this.coordinates.length) {
			const coord_1 = this.coordinates[i - 1];
			const coord_2 = this.coordinates[i];

			out += new LineXML(coord_1, coord_2) + '\n';
			i++;
		}

		return out;
	}

	rotate(point: [coordinate, coordinate]): void {
		throw new Error('Method not implemented.');
	}
	scale(size: number): void {
		throw new Error('Method not implemented.');
	}
	moveBy(point: [coordinate, coordinate]): void {
		throw new Error('Method not implemented.');
	}
}

export function wrapTag(tag: string, body: string): string {
	return `<${tag}>\n${body}\n</${tag}>`;
}

abstract class ToString {
	abstract toString(): string;
}

export class Rotate {
	/**
	 * @param start [градусы] начальный разворот
	 * @param step  [градусы] шаг дублирования
	 * @param count количество дублирование
	 * @example new Rotate([el_1, el_2], 30, 0, 0) // повернет элементы el_1 el_2 на 30 градусов относительно центра
	 */
	constructor(
		private body: ToString[],
		private start: string | number,
		private step: string | number,
		private count: string | number,
	) {}

	toString(): string {
		const body = this.body.reduce((prev, curr) => prev + '\n' + curr + '', '');

		return `\n<rotate start="${this.start}" step="${this.step}" count="${this.count}">\n${body}\n</rotate>`;
	}
}
