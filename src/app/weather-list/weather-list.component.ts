import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item/weather';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];
  showInfo = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherItems = this.weatherService.getWeatherItems();
  }

  handleNotification(event) {
    this.showInfo = event;
  }

}
