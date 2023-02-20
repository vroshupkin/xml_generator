import { checkBracker as checkBracket } from './common/parser';
import { Condition } from './condition';
import { coordinate, IFigureOperation } from './figure.interface';

export type TFigure =
	| LineXML
	| Arc
	| Circle
	| LinePath
	| Rotate
	| Arc_3points
	| Arc_2points_and_radius;
export class Arc {
	/**
	 * @param center_point [coord, coord]
	 * @param radius [мм]
	 * @param startAngle [радиан]
	 * @param endAngle [радиан]
	 * @param clockwise
	 */
	constructor(
		private center_point: [coordinate, coordinate],
		private radius: string | number,
		private startAngle: string | number,
		private endAngle: string | number,
		private clockwise: boolean = true,
	) {
		checkBracket(this.center_point[0] + '');
		checkBracket(this.center_point[1] + '');
	}

	toString(): string {
		return `
    <arc 
        R="${this.radius}" 
        start="${this.startAngle}"
        end="${this.endAngle}"
        clockwise="${this.clockwise}"
    >
        <point>
            <x>${this.center_point[0]}</x>
            <y>${this.center_point[1]}</y>
        </point>
    </arc>
`;
	}
}

// const v1 = [
// 	`${x0} + (${z_L} / 2) + COS(180 + ${alpha} * (180 / M_PI)) * ${z_L}`,
// 	`${y0} + SIN(180 + ${alpha} * (180 / M_PI)) * ${z_L} `,
// ];

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

/* 
	Дуга по двум точкам и радиус
*/
export class Arc_2points_and_radius {
	/**
	 * @param p0 [мм] 1-ая точка
	 * @param p1 [мм] 2-ая точка
	 * @param radius [мм] Радиус скругления
	 * @param bend_direction - С какой стороны изгиб по направлению движения
	 */
	constructor(
		private p0: [coordinate, coordinate],
		private p1: [coordinate, coordinate],
		private radius: string,
		private bend_direction: 'left' | 'right' = 'left',
	) {
		checkBracket(p0[0] + '');
		checkBracket(p1[0] + '');
		checkBracket(p0[1] + '');
		checkBracket(p1[1] + '');
	}

	toString(): string {
		const R = this.radius;
		const [x0, y0] = [this.p0[0] + '', this.p0[1] + ''];
		const [x1, y1] = [this.p1[0] + '', this.p1[1] + ''];

		const X = `(${x1} - ${x0})`;
		const Y = `(${y1} - ${y0})`;

		const z_L = `( ${R} - SQRT((${R} * ${R}) - ((${X} * ${X} + ${Y} * ${Y})) / 4 ) )`;
		checkBracket(z_L);

		const alpha_rad = `( ATAN2(${Y}, ${X}) )`;
		const alpha_deg = `( 180 * ATAN2(${Y}, ${X}) / (M_PI) )`;
		checkBracket(alpha_rad);
		checkBracket(alpha_deg);

		const sinSign = this.bend_direction === 'left' ? '-' : ' ';
		const cosSign = this.bend_direction === 'left' ? ' ' : '-';

		const vec_1 = [
			`( ${sinSign}( SIN(${alpha_deg}) * ${z_L}) )`,
			`( ${cosSign}( COS(${alpha_deg}) * ${z_L}) )`,
		];
		const vec_2 = [
			`( (${x1} + ${x0}) / 2) + ${vec_1[0]}`,
			`( (${y1} + ${y0}) / 2) + ${vec_1[1]}`,
		];

		checkBracket(vec_1[0]);
		checkBracket(vec_1[1]);
		checkBracket(vec_2[0]);
		checkBracket(vec_2[1]);

		return new Arc_3points(this.p0, vec_2 as [coordinate, coordinate], this.p1) + '';
	}

	/**
	 * Генерирует <param> для валидации ошибок введенных данных
	 * @param message Сообщение о ошибке
	 */
	generateParam(message: string): string {
		const [x0, y0] = [this.p0[0] + '', this.p0[1] + ''];
		const [x1, y1] = [this.p1[0] + '', this.p1[1] + ''];

		const R = this.radius + '';
		const X = `(${x1} - ${x0})`;
		const Y = `(${y1} - ${y0})`;

		const condition = `(${R} * ${R}) >= ( ((${X} * ${X} + ${Y} * ${Y})) / 4)`;
		checkBracket(condition);

		const output = new Condition(message, condition) + '';

		return output;
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
