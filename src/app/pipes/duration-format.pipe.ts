import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(seconds: number): string {
    let duration : string;
    let hours : number  = Math.floor(seconds / 3600);
    let minutes : number = Math.ceil((seconds - (hours * 3600)) / 60);
  
  
    duration = (hours > 0 ? hours + " hours" : "");
    duration += (hours > 0 && minutes > 0 ? ", " : "");
    duration += (minutes > 0 ? minutes + " minutes" : "");
    return duration;
  }
}
