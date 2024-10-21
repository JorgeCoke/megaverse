import type { CellType } from "../enum/cell-type.enum";
import type { Coords } from "../interfaces/coords.interface";
import type { CellSymbol } from "../types/cell-symbol.type";

export class Cell implements Coords {
	row: number;
	column: number;
	symbol: CellSymbol;
	type: CellType;

	constructor(coords: Coords, symbol: CellSymbol, type: CellType) {
		this.row = coords.row;
		this.column = coords.column;
		this.symbol = symbol;
		this.type = type;
	}
}
