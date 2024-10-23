import type { CellType } from "../enum/cell-type.enum";
import { Cell, type MegaverseCell } from "./cell.class";

export class Polyanet extends Cell implements MegaverseCell {
	type: CellType.POLYANET;

	// NOTE: We can omit the constructor here
}
