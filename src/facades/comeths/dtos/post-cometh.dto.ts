import type { Coords } from "../../../models/interfaces/coords.interface";
import type { ComethDirection } from "../../../models/types/cometh-direction.type";

export type PostSoloonDto = {
	candidateId: string;
	direction: ComethDirection;
} & Coords;
