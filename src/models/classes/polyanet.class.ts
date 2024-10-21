import type { Coords } from "../interfaces/coords.interface";
import { Cell } from "./cell.class";

export class Polyanet extends Cell {
	constructor(coords: Coords) {
		super(coords, "🪐");
	}
}
