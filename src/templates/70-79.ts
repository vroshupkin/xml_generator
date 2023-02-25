import { generate, IGenerate } from '../../generator';
import { Arc, Circle, LinePath } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';

const figure_70: IGenerate = {
	name: `Прямоугольник с ушком и окружностью`,
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

		new Circle(['W/2 + X', 'H/2 + Y'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина ушка" default="70.0"></p>
		<p name="H1" desc="[мм] Высота ушка" default="50.0"></p>

        <p name="R" desc="[мм] Радиус" default="70.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

				
	</params>
	`,
};

const figure_73: IGenerate = {
	name: `Прямоугольник с круглым ушком и окружностью`,
	primitives: [
		new LinePath([
			['W/2 + dA / 2', 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
			['0', 'H'],
			['W/2 - dA/2', 'H'],
		]),

		new Arc(['W/2', 'H'], 'dA/2', 'M_PI', '0', true),

		new Circle(['W/2 + X', 'H/2 + Y'], 'R1'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Радиус ушка" default="80.0"></p>

        <p name="R1" desc="[мм] Радиус центральной окружности" default="70.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

				
	</params>
	`,
};

const figure_71: IGenerate = {
	name: `Прямоугольник с круглым ушком`,
	primitives: [
		new LinePath([
			['W/2 + dA / 2', 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
			['0', 'H'],
			['W/2 - dA/2', 'H'],
		]),

		new Arc(['W/2', 'H'], 'dA/2', 'M_PI', '0', true),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Радиус ушка" default="80.0"></p>

				
	</params>
	`,
};

const figure_72: IGenerate = {
	name: `Прямоугольник с круглым ушком и креплениями`,
	primitives: [
		new LinePath([
			['W/2 + dA / 2', 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
			['0', 'H'],
			['W/2 - dA/2', 'H'],
		]),

		new Arc(['W/2', 'H'], 'dA/2', 'M_PI', '0', true),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),

		new Circle(['W/2', 'H'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Радиус ушка" default="80.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>
				
	</params>
	`,
};

const figure_74: IGenerate = {
	name: `Прямоугольник с проёмом, окружностью и креплениями`,
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
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2', 'H'],
		]),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),

		new Circle(['W/2 + X', 'H/2 + Y'], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="80.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>

        <p name="Rc" desc="[мм] Радиус центральной окружности" default="50.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

	</params>
	`,
};

const figure_75: IGenerate = {
	name: `Прямоугольник с проёмом и окружностью`,
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
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2', 'H'],
		]),

		new Circle(['W/2 + X', 'H/2 + Y'], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="80.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>

        <p name="Rc" desc="[мм] Радиус центральной окружности" default="50.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

	</params>
	`,
};

const figure_76: IGenerate = {
	name: `Прямоугольник с проёмом и креплениями`,
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
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2', 'H'],
		]),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="80.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>

	</params>
	`,
};

const figure_77: IGenerate = {
	name: `Прямоугольник с трапциевидными проемами окружностью и креплениями`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['W/2 - (dA/2 + dW)', 'H'],
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2 + dW', 'H'],
			['W', 'H'],
			['W', '0'],

			['W/2 + dA/2 + dW', '0'],
			['W/2 + dA/2', '0 + dH'],
			['W/2 - dA/2', '0 + dH'],
			['W/2 - (dA/2 + dW)', '0'],
			[0, 0],
		]),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),

		new Circle(['W/2 + X', 'H/2 + Y'], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="40.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>
        <p name="dW" desc="[мм] Отступ трапеции" default="40.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>

        <p name="Rc" desc="[мм] Радиус центральной окружности" default="50.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

	</params>
	`,
};

const figure_78: IGenerate = {
	name: `Прямоугольник с трапциевидными проемами и окружностью`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['W/2 - (dA/2 + dW)', 'H'],
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2 + dW', 'H'],
			['W', 'H'],
			['W', '0'],

			['W/2 + dA/2 + dW', '0'],
			['W/2 + dA/2', '0 + dH'],
			['W/2 - dA/2', '0 + dH'],
			['W/2 - (dA/2 + dW)', '0'],
			[0, 0],
		]),

		new Circle(['W/2 + X', 'H/2 + Y'], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="40.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>
        <p name="dW" desc="[мм] Отступ трапеции" default="40.0"></p>


        <p name="Rc" desc="[мм] Радиус центральной окружности" default="50.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="0.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

	</params>
	`,
};

const figure_79: IGenerate = {
	name: `Прямоугольник с трапциевидными проемами креплениями`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['W/2 - (dA/2 + dW)', 'H'],
			['W/2 - dA/2', 'H - dH'],
			['W/2 + dA/2', 'H - dH'],
			['W/2 + dA/2 + dW', 'H'],
			['W', 'H'],
			['W', '0'],

			['W/2 + dA/2 + dW', '0'],
			['W/2 + dA/2', '0 + dH'],
			['W/2 - dA/2', '0 + dH'],
			['W/2 - (dA/2 + dW)', '0'],
			[0, 0],
		]),

		new Circle(['0 + dL', '0 + dL'], 'R'),
		new Circle(['0 + dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'H - dL'], 'R'),
		new Circle(['W - dL', '0 + dL'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dA" desc="[мм] Ширина проема" default="40.0"></p>
        <p name="dH" desc="[мм] Глубина проема" default="40.0"></p>
        <p name="dW" desc="[мм] Отступ трапеции" default="40.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="40.0"></p>

	</params>
	`,
};

// clearDirTemplate(() => {
// 	generate(figure_70);
// 	generate(figure_71);
// 	generate(figure_72);
// 	generate(figure_73);

// 	generate(figure_74);
// 	generate(figure_75);
// 	generate(figure_76);
// 	generate(figure_77);
// 	generate(figure_78);
// 	generate(figure_79);
// });
