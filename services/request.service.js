import axios from 'axios';

class RequestService {
  constructor(ApiService) {
    this.apiService = ApiService;
  }
}

export class WeatherRequest extends RequestService {
  constructor(apiConstructor) {
    super(apiConstructor);
  }

  async getWeather(city) {
    // https.get(this.apiService.getWeatherUrl(city), (response) => {
    //   let res = '';
    //   response.on('data', (chunk) => {
    //     res += chunk;
    //   });
    //   response.on('end', () => {
    //     console.log(res);
    //   });
    //   response.on('error', (error) => {
    //     console.log(error);
    //   });
    // });

    const { data } = await axios.get(this.apiService.getWeatherUrl(city));
    return data;
  }

  async getIcon() {}
}
