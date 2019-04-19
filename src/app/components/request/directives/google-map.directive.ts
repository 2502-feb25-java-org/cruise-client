import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';
import { InjectionToken } from '@angular/core';


declare var google: any;



@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin: any;
  @Input() destination: any;
  @Input() originPlaceId: any;
  @Input() destinationPlaceId: any;
  @Input() waypoints: any;
  @Input() directionsDisplay: any;
  @Input() estimatedTime: any;
  @Input() estimatedDistance: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }
  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }

      var directionsService = new google.maps.DirectionsService;
      var me = this;
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor: 'red'
        }
      });
      this.directionsDisplay.setDirections({ routes: [] });
      directionsService.route({
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        avoidHighways: false,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function (response: any, status: any) {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
          map.setZoom(30);
          var point = response.routes[0].legs[0];
          me.estimatedTime = point.duration.value; //in seconds with .value
          me.estimatedDistance = (point.distance.value * 0.62137) / 1000; //in meters, convert to km then miles
        } else {
          alert('Directions request failed due to ' + status);
        }
      });
    });
  }
}