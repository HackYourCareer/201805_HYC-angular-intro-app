import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../weather-item/weather';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  private city: string;
  private forecast: WeatherItem[];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => 
      this.weatherService.searchWeatherForecast(params.get('city')).
        subscribe( data => {
          this.city = params.get('city');
          this.forecast = data;
        })
    );
  }

}
