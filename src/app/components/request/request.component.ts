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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  distance: number = 4;
  duration: number = 14;
  carID: Car;

  ride: Ride;  

  public latitude: number;
  public longitude: number;
  public destinationInput: string;
  public destinationOutput: string;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;
  public cost: number;
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
    //console.log(rideService.start);
    console.log("hello world!");
  }

  //retrieves distance and time
  durationBetweenAddresses(firstAddress: any, secondAddress: any){
    this.pickupInputElementRef = firstAddress;
    this.pickupOutputElementRef = secondAddress;
    return this.vc.estimatedTime;    
  }


  ngOnInit() {
     //set google maps defaults
  this.zoom = 10;
  this.latitude = 21.1212853;
  this.longitude = -86.9893194;
  
 // this.mapCustomStyles = this.getMapCusotmStyles();

  //create search FormControl
 // this.destinationInput = new FormControl();
  //this.destinationOutput = new FormControl();
  
  //set current position
  this.setCurrentPosition();
  
  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });
    
             this.setupPlaceChangedListener(autocompleteInput, 'ORG');
            this.setupPlaceChangedListener(autocompleteOutput, 'DES');
  });
  }
  private setupPlaceChangedListener(autocomplete: any, mode: any ) {
    autocomplete.addListener("place_changed", () => {
          console.log(autocomplete);
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //verify result
            if (place.geometry === undefined) {
              return;
            }
            if (mode === 'ORG') {
                this.vc.origin = {lng: -86.8295894, la: 21.1354986 };
                this.vc.originPlaceId = place.place_id;
                console.log(this.vc.origin);
            } else {
                this.vc.destination = {lng: -86.8261042, lat: 21.20137644}; // its a example aleatory position
                this.vc.destinationPlaceId = place.place_id;
                console.log(this.vc.destination);
            }
  
            if(this.vc.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
                  this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                  
                }); 
          }
        
            //Update the directions
            console.log(this.vc, "traza")
            this.vc.updateDirections();
            this.zoom = 6;
          });
  
       });
  
  }
   route() {
        this.vc.origin = {lng: -86.8295894, la: 21.1354986 };  
        this.vc.destination = {lng: -86.8261042, lat: 21.20137644}; // its a example aleatory position
        this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
    
        this.vc.updateDirections();
        this.zoom = 6;
  }
  
  
  getDistanceAndDuration(){
    
    this.estimatedTime = Number.parseFloat(this.vc.estimatedTime).toFixed(2);    
    this.estimatedDistance = Number.parseFloat(this.vc.estimatedDistance).toFixed(2);    
    this.cost = 4 + 1.25*this.vc.estimatedDistance;
    
  }

  getEstimate(){
    this.estimatedTime = Number.parseFloat(this.vc.estimatedTime).toFixed(2);    
    this.estimatedDistance = Number.parseFloat(this.vc.estimatedDistance).toFixed(2);    
    this.cost = 4 + 1.25*this.vc.estimatedDistance;
    //this.estimatedTime = this.vc.estimatedTime;
    this.estimatedTime = Number.parseFloat(this.vc.estimatedTime).toFixed(2)
    //this.estimatedDistance = this.vc.estimatedDistance;
    this.estimatedDistance = Number.parseFloat(this.vc.estimatedDistance).toFixed(2)
    //this.cost = 4 + 1.25*this.estimatedDistance;
    this.cost = 4 + 1.25*this.vc.estimatedDistance //ignore error still works!!
    //alert(this.estimatedDistance);
  }
  
  scrollToBottom(): void {
    jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
  }
  private setPickUpLocation( place:any ) {
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log("ok")
          this.zoom = 6;
  }
  
  private setCurrentPosition() {
    console.log("ok")
    
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        console.log(this.latitude,this.longitude,"position    ");
  
      });  
  }
  

  createRide() {
    console.log(JSON.stringify(this.ride));
    this.rideService.postRide(this.ride).subscribe(
      myRespBody => {
        if (myRespBody != null && this.ride.car != null) {
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

  getCar() {
    this.carService.getAllAvailable().subscribe(
      myRespBody => {
        if (myRespBody != null) {
          this.ride.car = this.getClossestCar(myRespBody); // git the first car in the collection
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

  getClossestCar(cars : Car[]) {
    let clossestCar : Car;
    let minDuration : number = 999999999; 
    cars.forEach(car => {
      let durationFromCar = this.durationBetweenAddresses(Address.stringify(car.location), 
                                        this.pickupInputElementRef);
      if (durationFromCar < minDuration){
          clossestCar = car;
          minDuration = durationFromCar;
        }                                          
    });
    this.waitTime = minDuration;
    return clossestCar;
  }

  addRide() {
    this.ride = new Ride();
    this.ride.rider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
    this.ride.origin = Address.parse(this.destinationInput);
    this.ride.destination = Address.parse(this.destinationOutput);
    this.ride.distance = this.estimatedDistance;
    this.ride.duration = this.estimatedTime;
    this.ride.startTime = this.getStartTime();
    this.ride.endTime = this.getEndTime();
    this.ride.cost = this.cost;
    this.getCar();
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



