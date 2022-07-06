interface GetForecastByPosResponse {
  current: {
    temp: number;
  };
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }[];
}

interface GetForecastByPosRequest {
  lat: number;
  lon: number;
}

class WeatherService {
  static BASE_PATH = 'https://api.openweathermap.org/data/2.5/onecall';

  static async getForecastByPos({
    lat,
    lon,
  }: GetForecastByPosRequest): Promise<GetForecastByPosResponse> {
    const response = await fetch(
      `${this.BASE_PATH}?appid=ecb81a32abd64beff64b5bc7f39910c4&units=metric&lang=pt_br&lat=${lat}&lon=${lon}`,
    ).then((res) => res.json());

    return response as GetForecastByPosResponse;
  }
}

export { WeatherService };
export type { GetForecastByPosResponse };
