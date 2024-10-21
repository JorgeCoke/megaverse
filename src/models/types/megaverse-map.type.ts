import type { CellType } from "../enum/cell-type.enum";

export type MegaverseMap = {
	_id: string;
	content: MegaverseMapContent;
	candidateId: string;
	phase: number;
	__v: number;
};

export type MegaverseMapContent = ({ type: CellType } | null)[][];
