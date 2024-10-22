import { ofetch } from "ofetch";
import { env } from "./env";

export type HttpError = {
	error: string;
};

// For PUT, PATCH, and POST request methods, when a string or object body is set,
// ofetch adds the default content-type: "application/json" and accept: "application/json".
// ofetch Automatically retries the request (3 times) if an error happens
export const http = ofetch.create({
	baseURL: env.MEGAVERSE_API_BASE_URL,
	retry: 5,
	retryDelay: 5000, // ms
});
