import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { WeatherItem } from './weather-item/weather';
import { isJsObject } from '@angular/core/src/change_detection/change_detection_util';

@Injectable()
export class WeatherService {
    private WEATHER_ITEMS = [];
    constructor(private http: HttpClient) { }

    private WEATHER_MAPPER = (data: any, city: string) =>
                new WeatherItem(new Date(data.dt * 1000), city, data.weather[0].description,
                     data.main.temp, data.weather[0].icon, data.main.pressure, data.main.humidity)

    getWeatherItems() {
        return this.WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem: WeatherItem) {
        this.WEATHER_ITEMS.push(weatherItem);
    }

    clearWeatherItems() {
        this.WEATHER_ITEMS.splice(0);
    }

    searchWeatherData(cityName: string): Observable<WeatherItem> {
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${environment.API_KEY}&units=metric`).
            map(data => this.WEATHER_MAPPER(data, cityName));
    }

    searchWeatherForecast(cityName: string): Observable<WeatherItem[]> {
        return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&&APPID=${environment.API_KEY}&units=metric`).
            map((data: any) => data.list).
            map((dataList: any[]) => dataList.map( data => this.WEATHER_MAPPER(data, cityName))).
            catch(error => {
                console.error(error);
                return Observable.of(null);
            });
    }

}
