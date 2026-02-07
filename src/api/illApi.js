const BASE_URL = "https://api.impossiblelevels.com/api";

export const getLevels = async () => {
  const response = await fetch(`${BASE_URL}/levels`);

  if (!response.ok) {
    throw new Error("Failed to fetch levels");
  }

  return response.json();
};
