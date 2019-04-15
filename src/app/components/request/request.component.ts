import { AgmDirectionModule } from 'agm-direction';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RideService } from 'src/app/services/ride/ride.service';
import { Ride } from 'src/app/models/ride/ride';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  latitude :number = 40.7483872;
  longitude : number = -73.990094;

  origin: string = "119 W 31st St, New York, NY 10001";
  destination: string = "1752 Park Ave, New York, NY 10035";
  
  cost: number = 10;
  startTime :string = "2019-04-22 20:46";
  endTime : string = "2019-04-22 20:00";

  rider: Rider;
  distance: number = 4;
  duration: number = 14;
  carID: Car;

  ride: Ride;
  
  constructor(private rideService: RideService, private carService: CarService ) {
    //console.log(rideService.start);
    console.log("hello world!");
  }

  ngOnInit() {
  }

  createRide () {
    console.log(JSON.stringify(this.ride));
    this.rideService.postRide(this.ride).subscribe(
      myRespBody => {
        if(myRespBody != null && this.ride.car != null){
          this.ride = myRespBody;
          console.log(this.ride + " addded successfully");
        //window.location.href = "/request";
        } else {
          console.log('Could not create ride.');
        }
      },
      error => console.log('Observable not returned.')
    );
  }
  
  getClosestCar() {
    this.carService.getAllAvailable().subscribe(
      myRespBody => {
        if(myRespBody != null){
          this.ride.car = myRespBody[0]; // git the first car in the collection
          console.log(this.ride.car.make + " found");
          this.createRide();
        }
        else {
          console.log("Car not found");
          return null;
        }
      },
      error => console.log('Observable not returned')
    );
  }

  addRide() {
    this.ride = new Ride();
    this.ride.rider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
    this.ride.origin = Address.parse(this.origin);
    this.ride.destination = Address.parse(this.destination);
    this.ride.distance = this.distance;
    this.ride.duration = this.duration;
    this.ride.startTime = this.startTime;
    this.ride.endTime = this.endTime;
    this.ride.cost = this.cost;
    this.getClosestCar();


  }
}



