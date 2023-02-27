// 24.02

import { generate, IGenerate } from '../../generator';
import { Arc, Circle, LinePath } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';

const figure_60: IGenerate = {
	name: `Соединительный блок`,
	primitives: [
		new LinePath([
			['-W1', 'H2'],
			['0', 'H2'],
			[0, 0],
			['W2', '-H3'],
			['W2 + W3', 0],
			['W2 + W3', 'H2'],
			['W2', 'H1 + H2'],
			['-W1', 'H1 + H2'],
		]),

		new LinePath([
			['-W1', 'H1 + H2'],
			['-W1', '(H1 + H2) - ((H1 - W4) / 2)'],
			['L - (W1 + (W4 / 2))', '(H1 + H2) - ((H1 - W4) / 2)'],
		]),

		new Arc(
			['(-W1) + L + (-(W4/2))', 'H2 + (H1 / 2)'],
			'W4 / 2',
			'M_PI / 2',
			'3 * M_PI / 2',
			true,
		),

		new LinePath([
			['L - (W1 + (W4 / 2))', '(H2) + ((H1 - W4) / 2)'],
			['-W1', '(H2) + ((H1 - W4) / 2)'],
			['-W1', 'H2'],
		]),
	],
	params: `
	<params>
		
		<p name="W1" desc="[мм] Ширина части слева" default="100.0"></p>
		<p name="W2" desc="[мм] Ширина центральной части" default="100.0"></p>
		<p name="W3" desc="[мм] Ширина правой части" default="100.0"></p>
		<p name="W4" desc="[мм] Ширина выемки" default="30.0"></p>


		<p name="H1" desc="[мм] Высота вырхней части" default="100.0"></p>
		<p name="H2" desc="[мм] Высота середины" default="100.0"></p>
		<p name="H3" desc="[мм] Высота нижней части" default="50.0"></p>
		
		<p name="L" desc="[мм] Глубина выемки" default="40.0"></p>
		

	</params>
	`,
};

const figure_61: IGenerate = {
	name: `Соединительный блок c окружностью`,
	primitives: [
		new LinePath([
			['-W1', 'H2'],
			['0', 'H2'],
			[0, 0],
			['W2', '-H3'],
			['W2 + W3', 0],
			['W2 + W3', 'H2'],
			['W2', 'H1 + H2'],
			['-W1', 'H1 + H2'],
		]),

		new LinePath([
			['-W1', 'H1 + H2'],
			['-W1', '(H1 + H2) - ((H1 - W4) / 2)'],
			['L - (W1 + (W4 / 2))', '(H1 + H2) - ((H1 - W4) / 2)'],
		]),

		new Arc(
			['(-W1) + L + (-(W4/2))', 'H2 + (H1 / 2)'],
			'W4 / 2',
			'M_PI / 2',
			'3 * M_PI / 2',
			true,
		),

		new LinePath([
			['L - (W1 + (W4 / 2))', '(H2) + ((H1 - W4) / 2)'],
			['-W1', '(H2) + ((H1 - W4) / 2)'],
			['-W1', 'H2'],
		]),

		new Circle(['X + W2', 'Y + H2 / 2'], 'R'),
	],
	params: `
	<params>
		
		<p name="W1" desc="[мм] Ширина части слева" default="100.0"></p>
		<p name="W2" desc="[мм] Ширина центральной части" default="100.0"></p>
		<p name="W3" desc="[мм] Ширина правой части" default="100.0"></p>
		

		<p name="H1" desc="[мм] Высота вырхней части" default="100.0"></p>
		<p name="H2" desc="[мм] Высота середины" default="100.0"></p>
		<p name="H3" desc="[мм] Высота нижней части" default="50.0"></p>
		
		<p name="L" desc="[мм] Глубина выемки" default="40.0"></p>
		<p name="W4" desc="[мм] Ширина выемки" default="30.0"></p>

		<p name="R" desc="[мм] Радиус окружности" default="40.0"></p>
		<p name="X" desc="[мм] Смещение окружности по Х" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение окружности по Y" default="0.0"></p>
		

	</params>
	`,
};

//
const figure_62: IGenerate = {
	name: `Соединительный блок c креплениями`,
	primitives: [
		new LinePath([
			['-W1', 'H2'],
			['0', 'H2'],
			[0, 0],
			['W2', '-H3'],
			['W2 + W3', 0],
			['W2 + W3', 'H2'],
			['W2', 'H1 + H2'],
			['-W1', 'H1 + H2'],
		]),

		new LinePath([
			['-W1', 'H1 + H2'],
			['-W1', '(H1 + H2) - ((H1 - W4) / 2)'],
			['L - (W1 + (W4 / 2))', '(H1 + H2) - ((H1 - W4) / 2)'],
		]),

		new Arc(
			['(-W1) + L + (-(W4/2))', 'H2 + (H1 / 2)'],
			'W4 / 2',
			'M_PI / 2',
			'3 * M_PI / 2',
			true,
		),

		new LinePath([
			['L - (W1 + (W4 / 2))', '(H2) + ((H1 - W4) / 2)'],
			['-W1', '(H2) + ((H1 - W4) / 2)'],
			['-W1', 'H2'],
		]),

		new Circle(['W2', 'dL - H3'], 'R'),
		new Circle(['W2 + W3 - dL', 'H2 / 2'], 'R'),
		new Circle(['W2', 'H1 + H2 - dL'], 'R'),
	],
	params: `
	<params>
		
		<p name="W1" desc="[мм] Ширина части слева" default="100.0"></p>
		<p name="W2" desc="[мм] Ширина центральной части" default="100.0"></p>
		<p name="W3" desc="[мм] Ширина правой части" default="100.0"></p>
		

		<p name="H1" desc="[мм] Высота вырхней части" default="100.0"></p>
		<p name="H2" desc="[мм] Высота середины" default="100.0"></p>
		<p name="H3" desc="[мм] Высота нижней части" default="50.0"></p>
		
		<p name="L" desc="[мм] Глубина выемки" default="40.0"></p>
		<p name="W4" desc="[мм] Ширина выемки" default="30.0"></p>

        <p name="dL" desc="[мм] Отступ крепления" default="40.0"></p>
		<p name="R" desc="[мм] Радиус крепления" default="14.0"></p>
		
        ${new Condition('Отступ должен быть больше радиуса крепления', 'dL > R')}

	</params>
	`,
};

//
const figure_63: IGenerate = {
	name: `Прямоугольник с вогнутыми углами`,
	primitives: [
		new LinePath([
			[0, 'R'],
			[0, 'H - R'],
		]),
		new Arc([0, 'H'], 'R', '3 * M_PI / 2', '0 * M_PI / 2', false),

		new LinePath([
			['R', 'H'],
			['W - R', 'H'],
		]),
		new Arc(['W', 'H'], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			['W', 'H - R'],
			['W', 'R'],
		]),
		new Arc(['W', '0'], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			['W - R', '0'],
			['R', '0'],
		]),
		new Arc(['0', '0'], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
		
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		
		<p name="R" desc="[мм] Радиус угловых скруглений" default="30.0"></p>
		
	</params>
	`,
};

//
const figure_64: IGenerate = {
	name: `Прямоугольник с вогнутыми углами и окружностью`,
	primitives: [
		new LinePath([
			[0, 'R'],
			[0, 'H - R'],
		]),
		new Arc([0, 'H'], 'R', '3 * M_PI / 2', '0 * M_PI / 2', false),

		new LinePath([
			['R', 'H'],
			['W - R', 'H'],
		]),
		new Arc(['W', 'H'], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			['W', 'H - R'],
			['W', 'R'],
		]),
		new Arc(['W', '0'], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			['W - R', '0'],
			['R', '0'],
		]),
		new Arc(['0', '0'], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),

		new Circle(['X + W/2', 'Y + H/2'], 'R1'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="R" desc="[мм] Радиус угловых скруглений" default="30.0"></p>
		
        <p name="R1" desc="[мм] Радиус окружности" default="20.0"></p>
		<p name="X" desc="[мм] Смещение окружности по Х" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение окружности по Y" default="0.0"></p>
		
	</params>
	`,
};

//
const figure_65: IGenerate = {
	name: `Прямоугольник с вогнутыми углами и креплениями`,
	primitives: [
		new LinePath([
			[0, 'R'],
			[0, 'H - R'],
		]),
		new Arc([0, 'H'], 'R', '3 * M_PI / 2', '0 * M_PI / 2', false),

		new LinePath([
			['R', 'H'],
			['W - R', 'H'],
		]),
		new Arc(['W', 'H'], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			['W', 'H - R'],
			['W', 'R'],
		]),
		new Arc(['W', '0'], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			['W - R', '0'],
			['R', '0'],
		]),
		new Arc(['0', '0'], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),

		new Circle(['0 + dL', 'dL'], 'R1'),
		new Circle(['0 + dL', 'H - dL'], 'R1'),
		new Circle(['W - dL', 'H - dL'], 'R1'),
		new Circle(['W - dL', '0 + dL'], 'R1'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>
		<p name="R" desc="[мм] Радиус угловых скруглений" default="30.0"></p>
		
        <p name="R1" desc="[мм] Радиус креплений" default="15.0"></p>
		<p name="dL" desc="[мм] Отступ креплений от края прямоугольника" default="40.0"></p>
		
		
	</params>
	`,
};

const figure_66: IGenerate = {
	name: `Скоба с скосом`,
	primitives: [
		new LinePath([
			[0, 'R1'],
			[0, 'H'],
			['dW', 'H - dY'],
			['dW', 'dW + R2'],
		]),
		new Arc(['dW + R2', 'dW + R2'], 'R2', '3 * M_PI/2', '2 * M_PI / 2', true),

		new LinePath([
			['dW + R2', 'dW'],
			['W - dY', 'dW'],
			['W', 0],
			['R1', 0],
		]),

		new Arc(['R1', 'R1'], 'R1', '3 * M_PI/2', '2 * M_PI / 2', true),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>
        <p name="dW" desc="[мм] Толщина" default="40.0"></p>

        <p name="dY" desc="[мм] Размер скоса" default="20.0"></p>

		<p name="R1" desc="[мм] Радиус нижнего скругления" default="30.0"></p>
		<p name="R2" desc="[мм] Радиус верхнего скругления" default="30.0"></p>
		<p name="dY" desc="[мм] Размер скоса" default="50.0"></p>
				
	</params>
	`,
};

const figure_67: IGenerate = {
	name: `Скоба с скосом и креплениями`,
	primitives: [
		new LinePath([
			[0, 'R1'],
			[0, 'H'],
			['dW', 'H - dY'],
			['dW', 'dW + R2'],
		]),
		new Arc(['dW + R2', 'dW + R2'], 'R2', '3 * M_PI/2', '2 * M_PI / 2', true),

		new LinePath([
			['dW + R2', 'dW'],
			['W - dY', 'dW'],
			['W', 0],
			['R1', 0],
		]),

		new Arc(['R1', 'R1'], 'R1', '3 * M_PI/2', '2 * M_PI / 2', true),

		new Circle(['dW /2', 'H - (dL + R)'], 'R'),
		new Circle(['W - (dL + R)', 'dW /2'], 'R'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>
        <p name="dW" desc="[мм] Толщина" default="40.0"></p>

        <p name="dY" desc="[мм] Размер скоса" default="20.0"></p>

		<p name="R1" desc="[мм] Радиус нижнего скругления" default="30.0"></p>
		<p name="R2" desc="[мм] Радиус верхнего скругления" default="30.0"></p>
		<p name="dY" desc="[мм] Размер скоса" default="50.0"></p>
				
        <p name="R" desc="[мм] Радиус креплений" default="10.0"></p>
        <p name="dL" desc="[мм] Сдвиг креплений" default="50.0"></p>
				
	</params>
	`,
};

const figure_68: IGenerate = {
	name: `Прямоугольник с ушком`,
	primitives: [
		new LinePath([
			['W/2 + dA / 2', 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
			['0', 'H'],
			['W/2 - dA/2', 'H'],
		]),

		new LinePath([
			['W/2 - dA/2', 'H'],
			['W/2 - dA/2', 'H + H1'],
			['W/2 + dA/2', 'H + H1'],
			['W/2 + dA/2', 'H'],
		]),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина ушка" default="70.0"></p>
		<p name="H1" desc="[мм] Высота ушка" default="30.0"></p>
        
				
	</params>
	`,
};

const figure_69: IGenerate = {
	name: `Прямоугольник с ушком и креплениями`,
	primitives: [
		new LinePath([
			['W/2 + dA / 2', 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
			['0', 'H'],
			['W/2 - dA/2', 'H'],
		]),

		new LinePath([
			['W/2 - dA/2', 'H'],
			['W/2 - dA/2', 'H + H1'],
			['W/2 + dA/2', 'H + H1'],
			['W/2 + dA/2', 'H'],
		]),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),

		new Circle(['W/2', 'H + H1/2'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина ушка" default="70.0"></p>
		<p name="H1" desc="[мм] Высота ушка" default="50.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>

				
	</params>
	`,
};

// clearDirTemplate(() => {

// });

export const generate_60_69 = (): void => {
	generate(figure_60);
	generate(figure_61);
	generate(figure_62);
	generate(figure_63);
	generate(figure_64);
	generate(figure_65);
	generate(figure_66);
	generate(figure_67);

	generate(figure_68);
	generate(figure_69);
};
