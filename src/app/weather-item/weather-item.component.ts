import { Component, OnInit, Input } from '@angular/core';
import { WeatherItem } from './weather';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherItem: WeatherItem;
  @Input() details = false;
  constructor() { }

  ngOnInit() {
  }

  getIconUrl(): string {
    return `http://openweathermap.org/img/w/${this.weatherItem.icon}.png`;
  }

}
