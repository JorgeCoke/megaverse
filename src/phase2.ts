import {
	getMegaverseMap,
	getMegaverseMapGoal,
} from "./facades/megaverse/megaverse.facade";
import { generateCrossMintMegaverse } from "./services/megaverse.service";

const buildCrossmintMegaverse = async () => {
	// Get current MegaverseMap
	console.log("Getting megaverse map...");
	const megaverseMapRes = await getMegaverseMap();

	// Get current MegaverseMapGoal
	console.log("Getting megaverse map goal...");
	const megaverseMapGoalRes = await getMegaverseMapGoal();

	// Fix wrong cells
	console.log("Building Crossmint megaverse...");
	await generateCrossMintMegaverse(
		megaverseMapRes.map,
		megaverseMapGoalRes.goal,
	);

	console.log("Done! ✅");
};

buildCrossmintMegaverse();
