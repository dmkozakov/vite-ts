import { Response } from "./types";

const BASE_URL = "https://restcountries.com/v3.1";

export function fetchCountries(name: string): Promise<Response> {
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        throw new Error(String(response.status));
      }
      return response.json();
    }
  );
}
