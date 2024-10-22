import { env } from "../../lib/env";
import { http } from "../../lib/http";
import { sleep } from "../../lib/utils";
import { CellType } from "../../models/enum/cell-type.enum";
import type { MegaverseMap } from "../../models/types/megaverse-map.type";
import { deletePolyanet, postPolyanet } from "../polyanets/polyanets.facade";
import type { GetMegaverseMapDto } from "./dtos/get-megaverse-map.dto";

export const getMegaverseMapGoal = () => http(`/map/${env.CANDIDATE_ID}/goal`); // TODO: Add types

export const getMegaverseMap = () =>
	http<GetMegaverseMapDto>(`/map/${env.CANDIDATE_ID}`);

export const fillMegaverseMap = async (megaverseMap: MegaverseMap) => {
	for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
		const row = megaverseMap.content[rowIndex];
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			if (Math.random() > 0.7) {
				await postPolyanet({ row: rowIndex, column: columnIndex });
				await sleep(1000);
			}
		}
	}
};

export const clearMegaverseMap = async (megaverseMap: MegaverseMap) => {
	for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
		const row = megaverseMap.content[rowIndex];
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const column = row[columnIndex];
			if (column) {
				switch (column.type) {
					case CellType.POLYANET:
						await deletePolyanet({ row: rowIndex, column: columnIndex });
						await sleep(1000);
						break;
					default:
						throw new Error(`Unknown megaverseMap type: ${column.type}`);
				}
			}
		}
	}
};
