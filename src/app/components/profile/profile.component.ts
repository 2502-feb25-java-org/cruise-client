import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uName : string = "test";
  email: string = "test";
  homeAddr: string = "test";


  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ZeroConfigComponent {}