import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/models/ride/ride';
import { Address } from 'src/app/models/address/address';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  API_URL: string = 'http://localhost:8080/cruise/ride';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }


  public getByUsername(username : string): Observable<Ride>{
    return this.http.post<Ride>(this.API_URL + "/find", username, this.httpOptions);
  }

  public postRide(ride: Ride): Observable<Ride>{
    return this.http.post<Ride>(this.API_URL + "/add", ride, this.httpOptions);
  }

}

