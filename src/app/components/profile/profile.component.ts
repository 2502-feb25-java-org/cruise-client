import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uName: string;
  email: string;
  homeAddr: string;


  constructor() { }

  ngOnInit() {
    // this.uName = RiderService.globalRider.username;
    //this.email = "Test email";
    // this.homeAddr = RiderService.globalRider.addresses[1];
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ZeroConfigComponent {}