import { generate, IGenerate } from '../../generator';
import { Arc, Circle, LinePath, LineXML, Rotate } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';
import { coordinate } from '../figure.interface';

const figure_20_elments = new LinePath([
	['l * COS(360 / n)', 'l * SIN(360 / n)'],
	['l * COS(360 / n + 360 / n)', 'l * SIN(360 / n + 360 / n)'],
]);

const figure_21_1_elments = new LinePath([
	['l * COS(360 / n)', 'l * SIN(360 / n)'],
	['l * COS(360 / n + 360 / n)', 'l * SIN(360 / n + 360 / n)'],
]);

const figure_19_2__20: IGenerate = {
	name: `Общий треугольник по двум соторонам и углу между ними`,
	primitives: [
		new LinePath([
			[0, 0],
			['b * COS(angle)', 'b * SIN(angle)'],
			['a', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		
		<p name="a" desc="[мм] Основание" default="50.0"></p>
		<p name="b" desc="[мм] Левая сторона" default="50.0"></p>
		<p name="angle" desc="[градусы] Угол между сторонами" default="50.0"></p>

		<condition text="Правая сторона должно быть меньше суммы двух других сторон"><![CDATA[angle < 180]]></condition>
		
		
	</params>


	`,
};

const figure_0_1__21: IGenerate = {
	name: `Окружность в прямоугольнике`,
	primitives: [
		new LinePath([
			[`-(W / 2)`, `-(H / 2)`],
			[`-(W / 2)`, `(H / 2)`],
			[`(W / 2)`, `(H / 2)`],
			[`(W / 2)`, `-(H / 2)`],
			[`-(W / 2)`, `-(H / 2)`],
		]),
		new Circle(['X', 'Y'], 'R'),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="30.0"></p>
		<p name="X" desc="[мм] Х центра окружности" default="0.0"></p>
		<p name="Y" desc="[мм] Y центра окружности" default="0.0"></p>
		
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
				
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'X + R < W / 2')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'X - R > -(W / 2)')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'Y + R < (H / 2)')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'Y - R > -(H / 2)')}
		

	</params>
	`,
};

const f_0_2_obj: { [a: string]: [coordinate, coordinate] } = {
	p0: [`X - (W / 2)`, `Y - (H / 2)`],
	p1: [`X - (W / 2)`, `Y + (H / 2)`],
	p2: [`X + (W / 2)`, `Y + (H / 2)`],
	p3: [`X + (W / 2) `, `Y - (H / 2)`],
};

const figure_0_2__22: IGenerate = {
	name: `Прямоугольник в окружности`,
	primitives: [
		new Circle(['0', '0'], 'R'),
		new LinePath([f_0_2_obj.p0, f_0_2_obj.p1, f_0_2_obj.p2, f_0_2_obj.p3, f_0_2_obj.p0]),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="80.0"></p>
		<p name="X" desc="[мм] Х прямоугольника" default="0.0"></p>
		<p name="Y" desc="[мм] Y прямоугольника" default="0.0"></p>
		
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
		
		
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p0[0]}) * (${f_0_2_obj.p0[0]})) + ((${f_0_2_obj.p0[1]}) * (${f_0_2_obj.p0[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p1[0]}) * (${f_0_2_obj.p1[0]})) + ((${f_0_2_obj.p1[1]}) * (${f_0_2_obj.p1[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p2[0]}) * (${f_0_2_obj.p2[0]})) + ((${f_0_2_obj.p2[1]}) * (${f_0_2_obj.p2[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p3[0]}) * (${f_0_2_obj.p3[0]})) + ((${f_0_2_obj.p3[1]}) * (${f_0_2_obj.p3[1]})) < R * R`,
		)}
		
	</params>
	`,
};

const figure_24__23: IGenerate = {
	name: `Лопасть`,
	primitives: [
		new Arc([0, 0], 'R', 'M_PI - ASIN(H / (2 * R))', 'M_PI + ASIN(H / (2 * R))', true),

		new LinePath([
			['-(SQRT(R * R - H * H / 4))', '-(H / 2)'],
			['-(R + W)', '-(H / 2)'],
			['-(R + W)', '(H / 2)'],
			['-(SQRT(R * R - H * H / 4))', '(H / 2)'],
		]),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="100.0"></p>
		
		<p name="W" desc="[мм] Длина" default="70.0"></p>
		<p name="H" desc="[мм] Высота" default="70.0"></p>
		
		
	</params>

	`,
};

const figure_23__24: IGenerate = {
	name: `Блок`,
	primitives: [
		new Arc([0, 0], 'R1', 'M_PI / 2', '3 * M_PI / 2', false),
		new LineXML([0, '-(R1)'], ['L', '-(R2)']),
		new Arc(['L', 0], 'R2', 'M_PI / 2', '3 * M_PI / 2', true),
		new LineXML(['L', 'R2'], [0, 'R1']),
	],

	params: `
	<params>	
		<p name="R1" desc="[мм] Левый радиус" default="70.0"></p>
		<p name="R2" desc="[мм] Правый радиус" default="50.0"></p>
		<p name="L" desc="[мм] Длина между центрами окружностей" default="100.0"></p>
	</params>
	`,
};

const figure_20__25: IGenerate = {
	name: `Правильный многоульник`,
	primitives: [new Rotate([figure_20_elments], 0, '360 / n', 'n')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Длина стороны" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="6.0"></p>
		

		
	</params>


	`,
};

const figure_21__26: IGenerate = {
	name: `U скоба`,
	primitives: [
		new LinePath([
			['-R', '0'],
			['-R', 'H1'],
			['-(R + W)', 'H1'],
			['-(R + W)', 0],
		]),
		new Arc([0, 0], 'R + W', 'M_PI', '0', false),

		new LinePath([
			['R + W', 0],
			['R + W', 'H2'],
			['R', 'H2'],
			['R', '0'],
		]),
		new Arc([0, 0], 'R', 'M_PI', '0', false),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Внутренний радиус" default="50.0"></p>
		<p name="W" desc="[мм] Ширина детали" default="20.0"></p>
		<p name="H1" desc="[мм] Высота части слева" default="40.0"></p>
		<p name="H2" desc="[мм] Высота части справа" default="70.0"></p>
		
		<condition text="Ширина детали должна быть больше нуля"><![CDATA[W > 0]]></condition>
		
		
	</params>


	`,
};

const figure_21_1__27: IGenerate = {
	name: `Правильный многоульник в окружности`,
	primitives: [new Rotate([figure_21_1_elments], 0, '360 / n', 'n'), new Circle([0, 0], 'l')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Радиус" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="4.0"></p>
		

		
	</params>


	`,
};

const figure_21_2__28: IGenerate = {
	name: `Окружность в правильном многоугольнике`,
	primitives: [
		new Rotate([figure_21_1_elments], 0, '360 / n', 'n'),
		new Circle([0, 0], 'l * COS(180 / n)'),
	],

	params: `
	<params>
		<p name="l" desc="[мм] Сторона правильного многоугольника" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="4.0"></p>
	</params>


	`,
};

const figure_22__29: IGenerate = {
	name: `Четырехугольник`,
	primitives: [
		new LinePath([
			[0, 0],
			['x1', 'h1'],
			['x2', 'h2'],
			['x3', 'h3'],
			[0, 0],
		]),
	],

	params: `
	<params>	
		<p name="x1" desc="[мм] Ширина x1" default="10.0"></p>
		<p name="h1" desc="[мм] Высота h1" default="80.0"></p>

		<p name="x2" desc="[мм] Ширина x2" default="100.0"></p>
		<p name="h2" desc="[мм] Высота h2" default="60.0"></p>

		<p name="x3" desc="[мм] Ширина x3" default="100.0"></p>
		<p name="h3" desc="[мм] Высота h3" default="0.0"></p>
		
		
		
	</params>


	`,
};

export const generate_20_29 = (): void => {
	generate(figure_19_2__20);
	generate(figure_0_1__21);
	generate(figure_0_2__22);
	generate(figure_24__23);
	generate(figure_23__24);
	generate(figure_20__25);
	generate(figure_21__26);
	generate(figure_21_1__27);
	generate(figure_21_2__28);
	generate(figure_22__29);
};
