import { Component, OnInit } from '@angular/core';
import { Rider } from './models/rider/rider';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cruise-client';

  

  public constructor() {
   
  }

  public ngOnInit() { }

  globalRider: Rider;
}
