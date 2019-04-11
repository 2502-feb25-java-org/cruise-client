import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RideService } from 'src/app/services/ride/ride.service';
import { Ride } from 'src/app/models/ride/ride';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  test: string;
  id: number;
  start: Address;
  destination: Address;
  distance: number;
  duration: number;
  
  constructor(private rideService: RideService) {
   //console.log(rideService.start);
   console.log("hello world!");
   }

  ngOnInit() {
    this.test = this.rideService.test();
    
  }

  addRide(){
    let ride = new Ride();
    let address = new Address();

    ride.start = this.start;
    ride.destination = this.destination;
    ride.distance = this.distance;
    ride.duration = this.duration;

    console.log(JSON.stringify(ride));
    this.rideService.postRide(ride).subscribe(
      r => {
        console.log(r + "addded successfully");
        window.location.href = "/request";
      },
      error => console.log('ERR')
    );
    
  }
    
  }
  


