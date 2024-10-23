import { env } from "../../lib/env";
import { http } from "../../lib/http";
import { sleep } from "../../lib/utils";
import { CellType } from "../../models/enum/cell-type.enum";
import { deleteCometh, postCometh } from "../comeths/comeths.facade";
import { deletePolyanet, postPolyanet } from "../polyanets/polyanets.facade";
import { deleteSoloon, postSoloon } from "../soloons/soloons.facade";
import type { GetMegaverseMapGoalDto } from "./dtos/get-megaverse-map-goal.dto";
import type {
	GetMegaverseMapDto,
	MegaverseMap,
} from "./dtos/get-megaverse-map.dto";

export const getMegaverseMapGoal = () =>
	http<GetMegaverseMapGoalDto>(`/map/${env.CANDIDATE_ID}/goal`);

export const getMegaverseMap = () =>
	http<GetMegaverseMapDto>(`/map/${env.CANDIDATE_ID}`);

export const clearMegaverseMap = async (megaverseMap: MegaverseMap) => {
	for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
		const row = megaverseMap.content[rowIndex];
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const cell = row[columnIndex];
			if (cell) {
				switch (cell.type) {
					case CellType.POLYANET:
						await deletePolyanet({ row: rowIndex, column: columnIndex });
						break;
					case CellType.SOLOON:
						await deleteSoloon({ row: rowIndex, column: columnIndex });
						break;
					case CellType.COMETH:
						await deleteCometh({ row: rowIndex, column: columnIndex });
						break;
					default:
						throw new Error(`Unknown megaverseMap Cell Type: ${cell}`);
				}
				await sleep(1000);
			}
		}
	}
};

export const fillMegaverseMapRandomly = async (megaverseMap: MegaverseMap) => {
	for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
		const row = megaverseMap.content[rowIndex];
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const random = Math.random();
			if (random > 0.9) {
				await postPolyanet({ row: rowIndex, column: columnIndex });
				await sleep(1000);
			} else if (random > 0.8) {
				await postSoloon(
					{ row: rowIndex, column: columnIndex },
					random > 0.85 ? "blue" : "white",
				);
				await sleep(1000);
			} else if (random > 0.7) {
				await postCometh(
					{ row: rowIndex, column: columnIndex },
					random > 0.75 ? "down" : "up",
				);
				await sleep(1000);
			}
		}
	}
};
