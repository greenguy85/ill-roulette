const BASE_URL = "https://api.impossiblelevels.com/api";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

export const getLevels = async () => {
  const response = await fetch(`${CORS_PROXY}${BASE_URL}/levels`);
  if (!response.ok) throw new Error("Failed to fetch levels");
  return response.json();
};
