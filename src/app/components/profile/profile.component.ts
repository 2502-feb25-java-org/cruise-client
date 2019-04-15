import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'
import { Rider } from '../../models/rider/rider'
import { Ride } from 'src/app/models/ride/ride';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser : Rider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
  rides: Ride[] = this.getRides();

  name : string = this.loggedUser.firstName + " " + this.loggedUser.lastName;
  uName : string = this.loggedUser.username;
  email : string = this.loggedUser.email;
  homeAddr : string;
  addressLine2 : string;
  profDob : string = this.loggedUser.dob;

  constructor() { }

  getRides() : Ride[]{
    let rides : Ride[];
    

    return null;
  }

  ngOnInit() {
    if(this.loggedUser.address.line2 == "" || this.loggedUser.address.line2 == null){
      this.addressLine2 = ", ";
    } 
    else{
      this.addressLine2 = ", " + this.loggedUser.address.line2;
    }
    this.homeAddr = this.loggedUser.address.line1 + ", " + this.loggedUser.address.city + ", " 
    + this.loggedUser.address.state + ", " + this.loggedUser.address.country + ", " + this.loggedUser.address.zipcode;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ZeroConfigComponent { }