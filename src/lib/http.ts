import { ofetch } from "ofetch";
import { env } from "./env";

// For PUT, PATCH, and POST request methods, when a string or object body is set,
// ofetch adds the default content-type: "application/json" and accept: "application/json".
// ofetch Automatically retries the request (3 times) if an error happens
export const http = ofetch.create({
	baseURL: env.API_BASE_URL,
});
