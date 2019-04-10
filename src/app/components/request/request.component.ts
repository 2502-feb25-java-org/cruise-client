import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RideService } from 'src/app/services/ride/ride.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { Ride } from 'src/app/models/ride/ride';



@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  id: number;
  start: String;
  destination: String;
  distance: number;
  duration: number;

  constructor(private rideService: RideService) {
    console.log('in RequestComponent constructor. instantiating rideService');

  }

  ngOnInit() {
    this.addride();

  }

  addride() {
    let ride = new Ride();


    ride.start;
    ride.destination;
    ride.duration;
    ride.distance;
    ride.type;

    console.log(JSON.stringify(ride));
    this.rideService.postRide(ride).subscribe(
      r => {
        console.log(r + "addded successfully");
      },
      error => console.log('ERR')
    );




  }


}
