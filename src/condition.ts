export class Condition {
	constructor(private text: string, private condition: string) {}

	toString(): string {
		return `<condition text="${this.text}"><![CDATA[${this.condition}]]></condition>`;
	}
}
