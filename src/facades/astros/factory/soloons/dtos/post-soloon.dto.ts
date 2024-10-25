import type { Coords } from "../../../../../models/types/coords.type";
import type { SoloonColor } from "../../../../../models/types/soloon-color.type";

export type PostSoloonDto = {
	candidateId: string;
	color: SoloonColor;
} & Coords;
