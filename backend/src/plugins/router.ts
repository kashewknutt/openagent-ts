import { handleMath } from "./math";
import { handleWeather } from "./weather";

export async function pluginRouter(message: string): Promise<string | null> {
  const lower = message.toLowerCase();

  // Math plugin
  if (lower.startsWith("calculate ")) {
    const expr = message.replace(/^calculate /i, "");
    return handleMath(expr);
  }

  // Weather plugin
  if (lower.includes("weather in")) {
    const match = lower.match(/weather in ([a-zA-Z\s]+)/);
    if (match) {
      return match[1] ? await handleWeather(match[1].trim()) : null;
    }
  }

  // No plugin matched
  return null;
}
