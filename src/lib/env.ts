// NOTE: As of Node.js 20.12 (and all Node 22.x versions), env files can be loaded programmatically via process.loadEnvFile()
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	MEGAVERSE_API_BASE_URL: z.string().min(1),
	CANDIDATE_ID: z.string().min(1),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
	throw new Error(`Error loading .env file. ${envParse.error.message}`);
}

export const env = envParse.data;
