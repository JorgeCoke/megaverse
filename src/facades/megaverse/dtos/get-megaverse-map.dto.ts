import type { AstroType } from "../../../models/enum/astro-type.enum";
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

export type MegaverseMapContent = MegaverseMapContentAstro[][];

export type MegaverseMapContentAstro =
	| {
			type: AstroType.POLYANET;
	  }
	| { type: AstroType.SOLOON; color: SoloonColor }
	| { type: AstroType.COMETH; direction: ComethDirection }
	| null;
