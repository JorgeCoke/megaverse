import type { Coords } from "../../../models/types/coords.type";

export type DeleteAstroDto = {
	candidateId: string;
} & Coords;
