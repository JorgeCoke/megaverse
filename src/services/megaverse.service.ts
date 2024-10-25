import { inject, injectable } from "inversify";
import type { AstroGoal } from "../facades/megaverse/dtos/get-megaverse-map-goal.dto";
import type {
	MegaverseMap,
	MegaverseMapContentAstro,
} from "../facades/megaverse/dtos/get-megaverse-map.dto";

import { AstroType } from "../models/enum/astro-type.enum";
import { AstroFacadeFactory } from "../facades/astros/astro-facade.factory";
import { AstroDirector } from "../models/classes/directors/astro.director";
import type { Coords } from "../models/types/coords.type";

@injectable()
export class MegaverseService {
	constructor(
		@inject(AstroFacadeFactory)
		private readonly astroFacadeFactory: AstroFacadeFactory,
		@inject(AstroDirector) private readonly astroDirectior: AstroDirector,
	) {}

	/**
	 * Clears all astro objects from the provided megaverse map.
	 * Iterates through each cell in the map, identifies the astro type, and deletes it using the appropriate facade.
	 * @param megaverseMap The map containing astro objects to be cleared.
	 */
	public async clearMegaverseMap(megaverseMap: MegaverseMap) {
		for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
			const row = megaverseMap.content[rowIndex];
			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				const astro = row[columnIndex];
				if (astro) {
					const coords: Coords = { row: rowIndex, column: columnIndex };
					await this.astroFacadeFactory.getFacade(astro.type).delete(coords);
				}
			}
		}
	}

	/**
	 * Populates the megaverse map with random astro objects at random coordinates.
	 * Iterates through each cell in the map, randomly deciding whether to create an astro object based on probability.
	 * @param megaverseMap The map to be filled with randomly placed astro objects.
	 */
	public async fillMegaverseMapRandomly(megaverseMap: MegaverseMap) {
		for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
			const row = megaverseMap.content[rowIndex];
			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				const random = Math.random();
				if (random > 0.9) {
					const polyanet = this.astroDirectior.buildPolyanet({
						row: rowIndex,
						column: columnIndex,
					});
					await this.astroFacadeFactory
						.getFacade(AstroType.POLYANET)
						.post(polyanet);
				} else if (random > 0.8) {
					const soloon = this.astroDirectior.buildRedSoloon({
						row: rowIndex,
						column: columnIndex,
					});
					await this.astroFacadeFactory
						.getFacade(AstroType.SOLOON)
						.post(soloon);
				} else if (random > 0.7) {
					const cometh = this.astroDirectior.buildUpCometh({
						row: rowIndex,
						column: columnIndex,
					});
					await this.astroFacadeFactory
						.getFacade(AstroType.COMETH)
						.post(cometh);
				}
			}
		}
	}

	/**
	 * Adjusts the MegaverseMap to align with the specified Goal by correcting any mismatched cells.
	 * Iterates through each cell in the MegaverseMap, comparing it with the corresponding cell in the Goal.
	 * If a discrepancy is found, it fixes the cell to match the Goal, ensuring the map conforms to the desired state.
	 * @param megaverseMap The current state of the MegaverseMap to be adjusted.
	 * @param goal The target configuration that the MegaverseMap should match.
	 */
	public async generateCrossMintMegaverse(
		megaverseMap: MegaverseMap,
		goal: AstroGoal[][],
	) {
		for (let rowIndex = 0; rowIndex < megaverseMap.content.length; rowIndex++) {
			const row = megaverseMap.content[rowIndex];
			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				await this.fixAstro(
					megaverseMap.content[rowIndex][columnIndex],
					goal[rowIndex][columnIndex],
					{ row: rowIndex, column: columnIndex },
				);
			}
		}
	}

	/**
	 * Ensures that the specified cell in the Megaverse map matches the desired goal type.
	 * If the source cell type does not align with the goal cell type, this method updates the cell
	 * to match the goal by either deleting or creating the appropriate astro object.
	 * @param source The current astro object present at the specified coordinates in the Megaverse map.
	 * @param goal The desired astro goal type that the cell should match.
	 * @param coords The coordinates of the cell to be checked and potentially updated.
	 * @returns A promise that resolves once the adjustment operation is completed, if needed.
	 */
	public async fixAstro(
		source: MegaverseMapContentAstro,
		goal: AstroGoal,
		coords: Coords,
	) {
		switch (goal) {
			case "SPACE":
				if (source?.type) {
					return await this.astroFacadeFactory
						.getFacade(source.type)
						.delete(coords);
				}
				break;
			case "POLYANET":
				if (!source || source.type !== AstroType.POLYANET) {
					const polyanet = this.astroDirectior.buildPolyanet(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.POLYANET)
						.post(polyanet);
				}
				break;
			case "RED_SOLOON":
				if (
					!source ||
					source.type !== AstroType.SOLOON ||
					source.color !== "red"
				) {
					const soloon = this.astroDirectior.buildRedSoloon(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.SOLOON)
						.post(soloon);
				}
				break;
			case "WHITE_SOLOON":
				if (
					!source ||
					source.type !== AstroType.SOLOON ||
					source.color !== "white"
				) {
					const soloon = this.astroDirectior.buildWhiteSoloon(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.SOLOON)
						.post(soloon);
				}
				break;
			case "PURPLE_SOLOON":
				if (
					!source ||
					source.type !== AstroType.SOLOON ||
					source.color !== "purple"
				) {
					const soloon = this.astroDirectior.buildPurpleSoloon(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.SOLOON)
						.post(soloon);
				}
				break;
			case "BLUE_SOLOON":
				if (
					!source ||
					source.type !== AstroType.SOLOON ||
					source.color !== "blue"
				) {
					const soloon = this.astroDirectior.buildBlueSoloon(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.SOLOON)
						.post(soloon);
				}
				break;
			case "UP_COMETH":
				if (
					!source ||
					source.type !== AstroType.COMETH ||
					source.direction !== "up"
				) {
					const cometh = this.astroDirectior.buildUpCometh(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.COMETH)
						.post(cometh);
				}
				break;
			case "DOWN_COMETH":
				if (
					!source ||
					source.type !== AstroType.COMETH ||
					source.direction !== "down"
				) {
					const cometh = this.astroDirectior.buildDownCometh(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.COMETH)
						.post(cometh);
				}
				break;
			case "RIGHT_COMETH":
				if (
					!source ||
					source.type !== AstroType.COMETH ||
					source.direction !== "right"
				) {
					const cometh = this.astroDirectior.buildRightCometh(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.COMETH)
						.post(cometh);
				}
				break;
			case "LEFT_COMETH":
				if (
					!source ||
					source.type !== AstroType.COMETH ||
					source.direction !== "left"
				) {
					const cometh = this.astroDirectior.buildLeftCometh(coords);
					return await this.astroFacadeFactory
						.getFacade(AstroType.COMETH)
						.post(cometh);
				}
				break;
			default:
				throw new Error(`Error. Unexpected AstroGoal type: ${goal}`);
		}
		return null;
	}
}
