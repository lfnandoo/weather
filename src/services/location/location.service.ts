interface Location {
  lat: number;
  lon: number;
  place_id: string;
  display_name: string;
}

type SearchLocationsResponse = Location[];

class LocationService {
  static BASE_PATH = 'https://nominatim.openstreetmap.org/search?format=json&limit=3';

  static async searchLocations(searchTerm: string): Promise<SearchLocationsResponse> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${searchTerm}`,
    ).then((res) => res.json());

    return response as SearchLocationsResponse;
  }
}

export { LocationService };
export type { Location };
