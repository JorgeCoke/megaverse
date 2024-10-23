import type { CellType } from "../enum/cell-type.enum";
import type { Coords } from "../interfaces/coords.interface";
import type { SoloonColor } from "../types/soloon-color.type";
import { Cell, type MegaverseCell } from "./cell.class";

export class Soloon extends Cell implements MegaverseCell {
	type: CellType.SOLOON;
	color: SoloonColor;

	constructor(coords: Coords, color: SoloonColor) {
		super(coords);
		this.color = color;
	}
}
