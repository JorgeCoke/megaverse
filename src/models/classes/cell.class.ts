import type { CellType } from "../enum/cell-type.enum";
import type { Coords } from "../interfaces/coords.interface";

export class Cell implements Coords {
	row: number;
	column: number;

	constructor(coords: Coords) {
		this.row = coords.row;
		this.column = coords.column;
	}
}

export abstract class MegaverseCell {
	abstract type: CellType;
}
