import { Component } from '@angular/core';
import { Rider } from './models/rider/rider';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cruise-client';
  
  globalRider: Rider;
}
