import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item/weather';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  private searchStream = new Subject<string>();
  data: any = null;

  constructor(private weatherService: WeatherService) {
  }

  submit() {
    const weatherItem = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp, this.data.weather[0].icon);
    this.weatherService.addWeatherItem(weatherItem);
    this.data = null;
  }

  onSearchLocation(cityName: string) {
    this.searchStream
      .next(cityName);
  }

  ngOnInit() {
    this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((input: string) => this.weatherService.searchWeatherData(input))
      .subscribe(
        data => this.data = data,
        err => this.data = null
      );
  }

}
