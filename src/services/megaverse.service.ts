import { deleteCometh, postCometh } from "../facades/comeths/comeths.facade";
import type { CellGoal } from "../facades/megaverse/dtos/get-megaverse-map-goal.dto";
import type {
	MegaverseMap,
	MegaverseMapContentCell,
} from "../facades/megaverse/dtos/get-megaverse-map.dto";
import {
	deletePolyanet,
	postPolyanet,
} from "../facades/polyanets/polyanets.facade";
import { deleteSoloon, postSoloon } from "../facades/soloons/soloons.facade";
import { sleep } from "../lib/utils";
import { CellType } from "../models/enum/cell-type.enum";
import type { Coords } from "../models/interfaces/coords.interface";

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

export const generateCrossMintMegaverse = async (
	megaverseMap: MegaverseMap,
	goal: CellGoal[][],
) => {
	for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
		const row = megaverseMap.content[rowIndex];
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const response = await fixCell(
				megaverseMap.content[rowIndex][columnIndex],
				goal[rowIndex][columnIndex],
				{ row: rowIndex, column: columnIndex },
			);
			if (response !== undefined) {
				await sleep(1000);
			}
		}
	}
};

const fixCell = async (
	source: MegaverseMapContentCell,
	goal: CellGoal,
	coords: Coords,
) => {
	switch (goal) {
		case "SPACE":
			if (source?.type === CellType.POLYANET) {
				return await deletePolyanet(coords);
			}
			if (source?.type === CellType.SOLOON) {
				return await deleteSoloon(coords);
			}
			if (source?.type === CellType.COMETH) {
				return await deleteCometh(coords);
			}
			break;
		case "POLYANET":
			if (!source || source.type !== CellType.POLYANET) {
				return await postPolyanet(coords);
			}
			break;
		case "RED_SOLOON":
			if (
				!source ||
				source.type !== CellType.SOLOON ||
				source.color !== "red"
			) {
				return await postSoloon(coords, "red");
			}
			break;
		case "WHITE_SOLOON":
			if (
				!source ||
				source.type !== CellType.SOLOON ||
				source.color !== "white"
			) {
				return await postSoloon(coords, "white");
			}
			break;
		case "PURPLE_SOLOON":
			if (
				!source ||
				source.type !== CellType.SOLOON ||
				source.color !== "purple"
			) {
				return await postSoloon(coords, "purple");
			}
			break;
		case "BLUE_SOLOON":
			if (
				!source ||
				source.type !== CellType.SOLOON ||
				source.color !== "blue"
			) {
				return await postSoloon(coords, "blue");
			}
			break;
		case "UP_COMETH":
			if (
				!source ||
				source.type !== CellType.COMETH ||
				source.direction !== "up"
			) {
				return await postCometh(coords, "up");
			}
			break;
		case "DOWN_COMETH":
			if (
				!source ||
				source.type !== CellType.COMETH ||
				source.direction !== "down"
			) {
				return await postCometh(coords, "down");
			}
			break;
		case "RIGHT_COMETH":
			if (
				!source ||
				source.type !== CellType.COMETH ||
				source.direction !== "right"
			) {
				return await postCometh(coords, "right");
			}
			break;
		case "LEFT_COMETH":
			if (
				!source ||
				source.type !== CellType.COMETH ||
				source.direction !== "left"
			) {
				return await postCometh(coords, "left");
			}
			break;
		default:
			throw new Error(`Error. Unexpected Cell Goal type: ${goal}`);
	}
};
