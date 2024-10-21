import type { Coords } from "../interfaces/coords.interface";
import type { CellSymbol } from "../types/cell-symbol.type";

export class Cell implements Coords {
	row: number;
	column: number;
	symbol: CellSymbol;

	constructor(coords: Coords, symbol: CellSymbol) {
		this.row = coords.row;
		this.column = coords.column;
		this.symbol = symbol;
	}
}
