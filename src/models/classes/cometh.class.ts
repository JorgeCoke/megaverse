import type { ComethDirection } from "../types/cometh-direction.type";
import type { Coords } from "../interfaces/coords.interface";
import { Cell, type MegaverseCell } from "./cell.class";
import type { CellType } from "../enum/cell-type.enum";

export class Cometh extends Cell implements MegaverseCell {
	type: CellType.COMETH;
	direction: ComethDirection;

	constructor(coords: Coords, direction: ComethDirection) {
		super(coords);
		this.direction = direction;
	}
}
