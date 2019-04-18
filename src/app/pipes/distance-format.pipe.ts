import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceFormat'
})
export class DistanceFormatPipe implements PipeTransform {

  transform(distance: number): string {
    if (distance != undefined)
      return distance.toFixed(2) + " miles";
    else
      return "";
  }
}
