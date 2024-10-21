import type { ComethDirection } from "../types/cometh-direction.type";
import type { Coords } from "../interfaces/coords.interface";
import { Cell } from "./cell.class";
import { CellType } from "../enum/cell-type.enum";

export class Cometh extends Cell {
	direction: ComethDirection;

	constructor(coords: Coords, direction: ComethDirection) {
		super(coords, "☄", CellType.COMETH);
		this.direction = direction;
	}
}
