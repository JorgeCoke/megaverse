import type { ComethDirection } from "../types/cometh-direction.type";
import type { Coords } from "../interfaces/coords.interface";
import { Cell } from "./cell.class";

export class Cometh extends Cell {
	direction: ComethDirection;

	constructor(coords: Coords, direction: ComethDirection) {
		super(coords, "☄");
		this.direction = direction;
	}
}
