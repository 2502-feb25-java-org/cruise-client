import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'
import { Rider } from '../../models/rider/rider'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser =JSON.parse( sessionStorage.getItem("loggedUserObj"));

   uName = this.loggedUser.username;
   email = this.loggedUser.email;
   homeAddr = this.loggedUser.address.line1 + this.loggedUser.address.line2 + this.loggedUser.address.city
    + this.loggedUser.address.country + this.loggedUser.address.zipcode;


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