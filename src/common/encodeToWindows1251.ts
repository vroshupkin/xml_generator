import * as windows1251 from 'windows-1251';

export function encodeToWindows1251(str: string): Uint8Array {
	const u16_arr = windows1251.encode(str);
	const u8_arr = new Uint8Array(u16_arr.length);

	u16_arr.forEach((symb, i) => (u8_arr[i] = symb));
	return u8_arr;
}
