import fetch from "node-fetch";

export async function handleWeather(location: string): Promise<string> {
  try {
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=3`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weather = await response.text();
    return weather;
  } catch (error) {
    return `Could not fetch weather for ${location}.`;
  }
}
