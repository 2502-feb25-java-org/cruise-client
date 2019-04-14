import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
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
  cost: number
  startTime: string;
  endTime: string;
  rider: Rider;
  start: Address;
  destination: Address;
  distance: number;
  duration: number;
  carID: Car;

  ride: Ride;
  
  constructor(private rideService: RideService, private carService: CarService ) {
    //console.log(rideService.start);
    console.log("hello world!");
  }

  ngOnInit() {
  }

  dummyStartAddress() {
    let address= new Address();
    address.line1 = "26 Crystal Ave";
    address.city = "New York";
    address.zipcode = "10039";
    address.state = "NY";
    address.type = "Other";
    address.country = "United States";
    return address;
  }

  dummyDestinationAddress() {
    let address= new Address();
    address.line1 = "8085 Terrace Court Syosset";
    address.city = "New York";
    address.zipcode = "11791";
    address.state = "NY";
    address.type = "Other";
    address.country = "United States";
    return address;
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

  getRidesByRiderId(id: number) {
    this.rideService.getByRiderId(id).subscribe(
      myRespBody=> {
          console.log(myRespBody);
      }
    )
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
    this.ride.start = this.dummyStartAddress();
    this.ride.destination = this.dummyDestinationAddress();
    this.ride.distance = 4;
    this.ride.duration = 14;
    this.ride.endTime = "2019-04-22 20:00";
    this.ride.startTime = "2019-04-22 20:46";
    this.ride.cost = 22;
    this.getClosestCar();


  }
}



