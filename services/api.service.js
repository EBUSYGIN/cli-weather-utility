class ApiConstructor {
  constructor(token) {
    this.token = token;
  }
}

export class WeatherApiConstructor extends ApiConstructor {
  constructor(token) {
    super(token);
  }

  getWeatherUrl(city) {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', this.token);
    url.searchParams.append('lang', 'ru');
    url.searchParams.append('units', 'metrics');
    return url;
  }
}

export const weatherApiConstructor = new WeatherApiConstructor(); // init API token
