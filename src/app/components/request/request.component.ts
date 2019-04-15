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

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class RequestComponent implements OnInit {
  //latitude :number = 40.7483872;
  //longitude : number = -73.990094;

  origin: string = "119 W 31st St, New York, NY 10001";
  destination: string = "1752 Park Ave, New York, NY 10035";

  //cost: number = 10;
  startTime: string = "2019-04-22 20:46";
  endTime: string = "2019-04-22 20:00";

  rider: Rider;
  distance: number = 4;
  duration: number = 14;
  carID: Car;

  ride: Ride;

  newRoute = {
    'coordA': '',
    'coordB': '',
    'asientos_disponibles': '',
    'activa': '',
    'horario': '',
  }

  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;
  public cost: number;

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

  ngOnInit() {
     //set google maps defaults
  this.zoom = 10;
  this.latitude = 21.1212853;
  this.longitude = -86.9893194;
  //this.iconurl = '../image/map-icon.png';
  //this.iconurl = 'https://image.flaticon.com/icons/png/128/484/484167.png';

 // this.mapCustomStyles = this.getMapCusotmStyles();
  //create search FormControl
  this.destinationInput = new FormControl();
  this.destinationOutput = new FormControl();
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
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
    this.cost = 4 + 1.25*this.estimatedDistance;
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

  getClosestCar() {
    this.carService.getAllAvailable().subscribe(
      myRespBody => {
        if (myRespBody != null) {
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



