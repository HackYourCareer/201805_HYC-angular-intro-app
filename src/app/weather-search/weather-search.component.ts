import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item/weather';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit, OnDestroy {
  cityName: string;
  private searchStream = new Subject<string>();
  private searchStreamSubscription: Subscription;
  weatherItem: WeatherItem = null;
  @Output() notify = new EventEmitter<boolean>();

  constructor(private weatherService: WeatherService) {
  }

  add() {
    this.weatherService.addWeatherItem(this.weatherItem);
    this.weatherItem = null;
    this.cityName = '';
  }

  onSearchLocation(cityName: string) {
    this.searchStream
      .next(cityName);
  }

  ngOnInit() {
    this.searchStreamSubscription = this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((input: string) => this.weatherService.searchWeatherData(input))
      .subscribe(
        data => {
          this.weatherItem = data;
          if (data) {
            this.notify.emit(false);
          } else {
            this.notify.emit(true);
          }
        },
        err => {
          this.weatherItem = null;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.searchStreamSubscription) {
      this.searchStreamSubscription.unsubscribe();
    }
  }

}
