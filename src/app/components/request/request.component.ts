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
  carFound = false;
  //===Car===
  carPicURL: string = "";

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
  public waitStatus: string = "";

  public autocompleteORG: google.maps.places.Autocomplete;
  public autocompleteDES: google.maps.places.Autocomplete;

  public waitTime: number;

  @ViewChild("originInput")
  public originInputElementRef: ElementRef;

  @ViewChild("destinationInput")
  public destinationInputElementRef: ElementRef;

  @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) googleMaps: DirectionsMapDirective;


  constructor(private rideService: RideService, private carService: CarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef) {
  }

  ngOnInit() {
    //set google maps defaults

    this.latitude = 40.748367;
    this.longitude = -73.990044;
    this.zoom = 10;


    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.autocompleteORG = new google.maps.places.Autocomplete(this.originInputElementRef.nativeElement, {
        types: ["address"]
      });

      this.autocompleteDES = new google.maps.places.Autocomplete(this.destinationInputElementRef.nativeElement, {
        types: ["address"]
      });

      this.setupPlaceChangedListener(this.autocompleteORG, 'ORG');
      this.setupPlaceChangedListener(this.autocompleteDES, 'DES');
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
        this.googleMaps.originPlaceId = place.place_id;
      } else {
        this.googleMaps.destinationPlaceId = place.place_id;
      }

      if (this.googleMaps.directionsDisplay === undefined) {
        this.mapsAPILoader.load().then(() => {
          this.googleMaps.directionsDisplay = new google.maps.DirectionsRenderer;
        });
      }
      //Update the directions
      this.googleMaps.updateDirections();
      this.zoom = 6;
    });
  }

  //retrieves distance and time
  // durationBetweenAddresses(firstAddress: any, secondAddress: any) {
  //   this.originInputElementRef.nativeElement.value = firstAddress;
  //   this.destinationInputElementRef.nativeElement.value = secondAddress;

  //   this.autocompleteORG.setValues(firstAddress);
  //   this.autocompleteDES.setValues(secondAddress);

  //   console.log("First: " + this.originInputElementRef.nativeElement.value);
  //   console.log(this.autocompleteORG.getPlace());
  //   console.log("Second: " + this.destinationInputElementRef.nativeElement.value);
  //   console.log(this.autocompleteORG.getPlace());

  //   return this.googleMaps.estimatedTime;
  // }

  clear() {
    this.estimatedTime = undefined;
    this.estimatedDistance = undefined;
    this.cost = undefined;
    this.waitTime = undefined;
    this.ready = false;
    this.waitStatus = "";
  }

  getEstimate() {
    this.originAddress = this.originInputElementRef.nativeElement.value;
    this.destinationAddress = this.destinationInputElementRef.nativeElement.value;
    this.estimatedTime = this.googleMaps.estimatedTime;
    this.estimatedDistance = this.googleMaps.estimatedDistance;
    this.cost = 4 + 1.25 * this.googleMaps.estimatedDistance;
    this.waitStatus = "Looking for nearest car...";
    this.getCar();

    console.log("Origin: " + this.originInputElementRef.nativeElement.value);
    console.log("Destination: " + this.destinationInputElementRef.nativeElement.value);
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
          alert("Thank you for your business.");
          window.location.href = "/request";
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
          this.getClossestCar(myRespBody); // git the first car in the collection
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
    let destinationAddresses: string[] = [];
    cars.forEach(car => {
      destinationAddresses.push(Address.stringify(car.location));
    });
    
    let service = new google.maps.DistanceMatrixService;
    let durations: number[] = [];
    let outputString = "";
    let me = this;
    service.getDistanceMatrix({
      origins: [this.originAddress],
      destinations: destinationAddresses,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        // let originList = response.originAddresses;
        // let destinationList = response.destinationAddresses;
        let results = response.rows[0].elements;

        for (let j = 0; j < results.length; j++) {
          // outputString += originList[0] + ' to ' + destinationList[j] +
          //   ': ' + results[j].distance.text + ' in ' +
          //   results[j].duration.text;
          durations.push(results[j].duration.value);
        }
        console.log("Comparing wait times to cars:");
        console.log(outputString);
        console.log(durations);

        let clossestCar: Car;
        let minDuration: number = 999999999;
        for (let i = 0; i < durations.length; i++) {
          if (durations[i] < minDuration) {
            minDuration = durations[i];
            clossestCar = cars[i];
          }
        }
        me.waitTime = minDuration;
        me.car = clossestCar;
        me.ready = true;
        me.waitStatus = "Car found.";
        this.carFound = true;
        this.carPicURL = me.car.picture;
        console.log("Found Car? "+ this.carFound + "car pic URL? " + this.carPicURL);
        console.log(me.car.make + " found at " + Address.stringify(me.car.location));
        console.log("Seconds till car arrives: " + me.waitTime);
      }
    });
  }

  addRide() {
    console.log(this.waitTime);
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
}



