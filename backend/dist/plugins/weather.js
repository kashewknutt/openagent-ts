"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWeather = handleWeather;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function handleWeather(location) {
    try {
        const url = `https://wttr.in/${encodeURIComponent(location)}?format=3`;
        const response = await (0, node_fetch_1.default)(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const weather = await response.text();
        return weather;
    }
    catch (error) {
        return `Could not fetch weather for ${location}.`;
    }
}
