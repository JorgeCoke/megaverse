import "reflect-metadata";
import { container } from "./inversify.config";
import { MegaverseService } from "./services/megaverse.service";
import { AstroFacadeFactory } from "./facades/astros/astro-facade.factory";
import { AstroType } from "./models/enum/astro-type.enum";
import { AstroDirector } from "./models/classes/directors/astro.director";
import { MegaverseFacade } from "./facades/megaverse/megaverse.facade";
import { Utils } from "./lib/utils";

(async () => {
	const megaverseFacade = container.get(MegaverseFacade);
	const megaverseService = container.get(MegaverseService);
	const astroDirector = container.get(AstroDirector);
	const astroFacadeFactory = container.get(AstroFacadeFactory);
	const utils = container.get(Utils);

	// Get current MegaverseMap
	console.log("Getting megaverse map...");
	const megaverseMapRes = await megaverseFacade.getMegaverseMap();

	// // Fill MegaverseMap with random astros (for testing purposes)
	// console.log("Filling megaverse map randomly...");
	// await megaverseService.fillMegaverseMapRandomly(megaverseMapRes.map);

	// Clear MegaverseMap
	console.log("Clearing megaverse map...");
	await megaverseService.clearMegaverseMap(megaverseMapRes.map);

	// Get X shape coords
	console.log("Getting X shape coords...");
	const XShapeCoords = utils.extractXShapeCoordsFromMatrix(
		megaverseMapRes.map.content,
		2,
	);

	// Create Polynets
	console.log("Running queries...");
	for (const coords of XShapeCoords) {
		const polyanet = astroDirector.buildPolyanet(coords);
		await astroFacadeFactory.getFacade(AstroType.POLYANET).post(polyanet);
	}

	console.log("Done! ✅");
})();
