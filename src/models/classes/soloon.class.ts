import type { Coords } from "../interfaces/coords.interface";
import type { SoloonColor } from "../types/soloon-color.type";
import { Cell } from "./cell.class";

export class Soloon extends Cell {
	color: SoloonColor;

	constructor(coords: Coords, color: SoloonColor) {
		super(coords, "🌙");
		this.color = color;
	}
}
