import type { Coords } from "../../../models/interfaces/coords.interface";

export type DeletePolyanetDto = {
	candidateId: string;
} & Coords;
