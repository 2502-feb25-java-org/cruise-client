import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RideService } from 'src/app/services/ride/ride.service';
import { Ride } from 'src/app/models/ride/ride';
import { Car } from 'src/app/models/car/car';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  test: string;
  cost: number
  endTime: string;
  startTime: string;
  riderId: number;
  startId: Address;
  destination: Address;
  distance: number;
  duration: number;
  carID: Car;
  
  

  constructor(private rideService: RideService) {
    //console.log(rideService.start);
    console.log("hello world!");
  }

  ngOnInit() {}

  addRide() {
    let ride = new Ride();
    let rider = new Rider();
    let address = new Address();
    let car = new Car();
    ride.cost = 22;
    ride.destination = this.destination;
    ride.distance = 4;
    ride.duration = 14;
    ride.endTime = "2019/04/22 20:00"
    ride.startTime = "2019/04/22 20:46"

    //car.make = this.make;

    console.log(JSON.stringify(ride));
    this.rideService.postRide(ride).subscribe(
      r => {
        console.log(r + "addded successfully");
        //window.location.href = "/request";
      },
      error => console.log('ERR')
    );
  }
}



