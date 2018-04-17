import { NgModule, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: WeatherListComponent },
  { path: 'weather/:city', component: WeatherDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
