import type { Coords } from "../../../../../models/types/coords.type";
import type { ComethDirection } from "../../../../../models/types/cometh-direction.type";

export type PostComethDto = {
	candidateId: string;
	direction: ComethDirection;
} & Coords;
