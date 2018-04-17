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
  weatherItem: WeatherItem = null;

  constructor(private weatherService: WeatherService) {
  }

  submit() {
    this.weatherService.addWeatherItem(this.weatherItem);
    this.weatherItem = null;
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
        data => this.weatherItem = data,
        err => this.weatherItem = null
      );
  }

}
