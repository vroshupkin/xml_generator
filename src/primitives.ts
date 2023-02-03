import { coordinate } from './generator.interface';

export class Arc {
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

export class Line {
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
