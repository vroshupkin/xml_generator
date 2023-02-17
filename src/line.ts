import { coordinate } from './figure.interface';

type TPoint2D = [coordinate, coordinate];
type TInterval = [coordinate, coordinate];

class Point2D {
	constructor(public x: number, public y: number) {}
}

class Line {
	private _k: number;
	private _b: number;
	private xInterval: TInterval;
	private yInterval: TInterval;

	constructor(p0: Point2D, p1: Point2D) {
		const Δx = p1.x - p0.x;
		const Δy = p1.y - p0.y;

		this._k = Δy / Δx;
		this._b = p0.y - this.k * p0.x;
	}

	get k(): number {
		return this._k;
	}

	get b(): number {
		return this._b;
	}
}
