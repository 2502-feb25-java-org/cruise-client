import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'
import { Rider } from '../../models/rider/rider'
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Ride } from 'src/app/models/ride/ride';
import { RideService } from 'src/app/services/ride/ride.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';



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
  email :string = this.loggedUser.email;
  homeAddr : string;
  addressLine2 : string;
  profDob : string = this.loggedUser.dob;

  dtOptions: DataTables.Settings = {
    "pageLength": 50
  };
  dtTrigger: Subject<Ride> = new Subject();
  

  constructor(private rideService: RideService) {

   }

  getRides() : Ride[] {
    let rides : Ride[] = [];

    this.rideService.getByRiderId(this.loggedUser.id)
      .subscribe(
      myRespBody => {
        if(myRespBody != null){
          this.rides = myRespBody;
          this.dtTrigger.next();
          console.log(this.rides + " found.");
        } else {
          console.log('Could not find rides.');
        }
      },
      error => console.log('Observable not returned.')
  );
    return rides;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    if(this.loggedUser.address.line2 == "" || this.loggedUser.address.line2 == null){
      this.addressLine2 = ", ";
    } 
    else{
      this.addressLine2 = ", " + this.loggedUser.address.line2;
    }
    this.homeAddr = this.loggedUser.address.line1 + ", " + this.loggedUser.address.city + ", " 
    + this.loggedUser.address.state + ", " + this.loggedUser.address.country + ", " + this.loggedUser.address.zipcode;
  
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})


export class ZeroConfigComponent { }