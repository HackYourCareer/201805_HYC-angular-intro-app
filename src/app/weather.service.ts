import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { WeatherItem } from './weather-item/weather';

@Injectable()
export class WeatherService {
    private WEATHER_ITEMS = [];
    constructor(private http: HttpClient) { }

    getWeatherItems() {
        return this.WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem: WeatherItem) {
        this.WEATHER_ITEMS.push(weatherItem);
    }

    clearWeatherItems() {
        this.WEATHER_ITEMS.splice(0);
    }

    searchWeatherData(cityName: string): Observable<any> {
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${environment.API_KEY}&units=metric`)
            .catch(error => {
                console.error(error);
                return Observable.of(null);
            });
    }

}
