import "reflect-metadata";
import { container } from "./inversify.config";
import { MegaverseService } from "./services/megaverse.service";
import { MegaverseFacade } from "./facades/megaverse/megaverse.facade";

(async () => {
	const megaverseService = container.get<MegaverseService>(MegaverseService);
	const megaverseFacade = container.get<MegaverseFacade>(MegaverseFacade);

	// Get current MegaverseMap
	console.log("Getting megaverse map...");
	const megaverseMapRes = await megaverseFacade.getMegaverseMap();

	// Get current MegaverseMapGoal
	console.log("Getting megaverse map goal...");
	const megaverseMapGoalRes = await megaverseFacade.getMegaverseMapGoal();

	// Fix wrong astros
	console.log("Building Crossmint megaverse...");
	await megaverseService.generateCrossMintMegaverse(
		megaverseMapRes.map,
		megaverseMapGoalRes.goal,
	);

	console.log("Done! ✅");
})();
