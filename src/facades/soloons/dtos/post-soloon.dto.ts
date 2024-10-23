import type { Coords } from "../../../models/interfaces/coords.interface";
import type { SoloonColor } from "../../../models/types/soloon-color.type";

export type PostSoloonDto = {
	candidateId: string;
	color: SoloonColor;
} & Coords;
