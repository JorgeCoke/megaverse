import { getMegaverseMap } from "./facades/megaverse/megaverse.facade";
import { postPolyanet } from "./facades/polyanets/polyanets.facade";
import { extractXShapeCoordsFromMatrix, sleep } from "./lib/utils";
import { clearMegaverseMap } from "./services/megaverse.service";

const buildPolynetMegaverse = async () => {
	// Get current MegaverseMap
	console.log("Getting megaverse map...");
	const megaverseMapRes = await getMegaverseMap();

	// // Fill MegaverseMap with random cells (for testing purposes)
	// console.log("Filling megaverse map randomly...");
	// await fillMegaverseMapRandomly(megaverseMapRes.map);

	// Clear MegaverseMap
	console.log("Clearing megaverse map...");
	await clearMegaverseMap(megaverseMapRes.map);

	// Get X shape coords
	console.log("Getting X shape coords...");
	const XShapeCoords = extractXShapeCoordsFromMatrix(
		megaverseMapRes.map.content,
		2,
	);

	// Create Polynets
	console.log("Running queries...");
	for (const coords of XShapeCoords) {
		await postPolyanet(coords);
		await sleep(1000);
	}

	console.log("Done! ✅");
};

buildPolynetMegaverse();
