import type { CellType } from "../../../models/enum/cell-type.enum";
import type { ComethDirection } from "../../../models/types/cometh-direction.type";
import type { SoloonColor } from "../../../models/types/soloon-color.type";

export type GetMegaverseMapDto = {
	map: MegaverseMap;
};

export type MegaverseMap = {
	_id: string;
	content: MegaverseMapContent;
	candidateId: string;
	phase: number;
	__v: number;
};

export type MegaverseMapContent = MegaverseMapContentCell[][];

export type MegaverseMapContentCell =
	| {
			type: CellType.POLYANET;
	  }
	| { type: CellType.SOLOON; color: SoloonColor }
	| { type: CellType.COMETH; direction: ComethDirection }
	| null;
