import { AgmDirectionModule } from 'agm-direction';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RideService } from 'src/app/services/ride/ride.service';
import { Ride } from 'src/app/models/ride/ride';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { DirectionsMapDirective } from './directives/google-map.directive';
import { } from 'googlemaps';
import { NgForm, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { stringify } from '@angular/compiler/src/util';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class RequestComponent implements OnInit {
  rider: Rider;
  car: Car;
  ride: Ride;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles: any;

  public originAddress: string;
  public destinationAddress: string;
  public estimatedTime: number;
  public estimatedDistance: number;
  public cost: number;
  public ready: boolean = false;

  public autocompleteInput: google.maps.places.Autocomplete;
  public autocompleteOutput: google.maps.places.Autocomplete;

  public waitTime: number;

  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;


  constructor(private rideService: RideService, private carService: CarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef) {
  }

  ngOnInit() {

    // this.ready = true;
    //this.getCar();

    //set google maps defaults
    this.zoom = 10;
    this.latitude = 21.1212853;
    this.longitude = -86.9893194;

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });

      this.autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });

      this.setupPlaceChangedListener(this.autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(this.autocompleteOutput, 'DES');
    });
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any) {
    autocomplete.addListener("place_changed", () => this.placeChanged(autocomplete, mode));
  }

  placeChanged(autocomplete: any, mode: any) {
    console.log("Counter");
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //verify result
      if (place.geometry === undefined) {
        return;
      }
      if (mode === 'ORG') {
        this.vc.originPlaceId = place.place_id;
      } else {
        this.vc.destinationPlaceId = place.place_id;
      }

      if (this.vc.directionsDisplay === undefined) {
        this.mapsAPILoader.load().then(() => {
          this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
        });
      }
      //Update the directions
      this.vc.updateDirections();
      this.zoom = 6;
    });
  }

    //retrieves distance and time
    durationBetweenAddresses(firstAddress: any, secondAddress: any) {
      this.pickupInputElementRef.nativeElement.value = firstAddress;
      this.pickupOutputElementRef.nativeElement.value = secondAddress;

      console.log("First: " + this.pickupInputElementRef.nativeElement.value);
      console.log("Second: " + this.pickupOutputElementRef.nativeElement.value);

      pickupInputElementRef.

      return this.vc.estimatedTime;
    }

  clear() {
    this.estimatedTime = undefined;
    this.estimatedDistance = undefined;
    this.cost = undefined;
  }

  getEstimate() {
    this.originAddress = this.pickupInputElementRef.nativeElement.value;
    this.destinationAddress = this.pickupOutputElementRef.nativeElement.value;
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
    this.cost = 4 + 1.25 * this.vc.estimatedDistance;

    this.getCar();

    this.ready = true;
    console.log("Origin: " + this.pickupInputElementRef.nativeElement.value);
    console.log("Destination: " + this.pickupOutputElementRef.nativeElement.value);
  }

  scrollToBottom(): void {
    jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
  }

  private setCurrentPosition() {
    console.log("ok")

    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 14;
      console.log(this.latitude, this.longitude, "position    ");

    });
  }

  // dummyRide() {
  //   let ride = new Ride();
  //   ride.type = "Test";
  //   ride.rider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
  //   ride.car = this.car;
  //   ride.origin = Address.parse(this.originAddress);
  //   ride.destination = Address.parse(this.destinationAddress);
  //   ride.distance = 45;
  //   ride.duration =
  //     ride.cost = this.cost;
  //   ride.status = "Requested";
  //   ride.startTime = this.getStartTime();
  //   ride.endTime = this.getEndTime();
  //   return ride;
  // }

  displayRide(ride: Ride) {
    console.log("Status: " + ride.status);
    console.log("Type: " + ride.type);
    console.log("Rider:")
    console.log(ride.rider);
    console.log("Car:");
    console.log(ride.car);
    console.log("Origin Address:");
    console.log(ride.origin);
    console.log("Destination Address");
    console.log(ride.destination);
    console.log("Star Time: " + ride.startTime);
    console.log("End Time: " + ride.endTime);
    console.log("Distance: " + ride.distance);
    console.log("Duration: " + ride.duration);
    console.log("Cost: " + ride.cost);
  }

  createRide() {
    console.log("Trying to create a ride...");
    this.displayRide(this.ride);
    this.rideService.postRide(this.ride).subscribe(
      myRespBody => {
        if (myRespBody != null && myRespBody.car != null) {
          this.ride = myRespBody;
          console.log(myRespBody + " addded successfully");
          //window.location.href = "/request";
        } else {
          console.log('Could not create ride.');
        }
      },
      error => console.log('Observable not returned.')
    );
  }

  getCar() {
    this.carService.getAllAvailable().subscribe(
      myRespBody => {
        if (myRespBody != null) {
          this.car = this.getClossestCar(myRespBody); // git the first car in the collection
          //this.car = myRespBody[0];
          console.log(this.car.make + " found at " + Address.stringify(this.car.location));
        }
        else {
          console.log("Car not found");
          return null;
        }
      },
      error => console.log('Observable not returned')
    );
  }

  getClossestCar(cars: Car[]) {
    let clossestCar: Car;
    let minDuration: number = 999999999;
    cars.forEach(car => {
      let durationFromCar = this.durationBetweenAddresses(Address.stringify(car.location),
        this.originAddress);
      console.log("duration:" + durationFromCar);
      if (durationFromCar < minDuration) {
        clossestCar = car;
        minDuration = durationFromCar;
      }
      //console.log(clossestCar);
    });
    this.waitTime = minDuration;
    this.pickupInputElementRef.nativeElement.value = this.originAddress;
    this.pickupOutputElementRef.nativeElement.value = this.destinationAddress;
    return clossestCar;
  }

  addRide() {
    if (!this.ready) {
      alert('Calculate Trip First!');
    } else {
      this.ride = new Ride();
      this.ride.type = "No Stops";
      this.ride.status = "Requested";
      this.ride.rider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
      this.ride.origin = Address.parse(this.originAddress);
      this.ride.destination = Address.parse(this.destinationAddress);
      this.ride.distance = this.estimatedDistance;
      this.ride.duration = this.estimatedTime;
      this.ride.startTime = this.getStartTime();
      this.ride.endTime = this.getEndTime();
      this.ride.cost = this.cost;
      this.ride.car = this.car;
      this.createRide();
    }
  }

  getStartTime() {
    let time = new Date();
    time.setSeconds(time.getSeconds() + this.waitTime);
    return time.toDateString() + " " + time.toTimeString().substring(0, 8);
  }

  getEndTime() {
    let time = new Date();
    time.setSeconds(time.getSeconds() + this.waitTime + this.estimatedTime);
    return time.toDateString() + " " + time.toTimeString().substring(0, 8);
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
   }
   
 deg2rad(deg) {
    return deg * (Math.PI/180)
   }

}



