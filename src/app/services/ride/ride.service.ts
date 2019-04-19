import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/models/ride/ride';
import { GlobalVariable } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  //API_URL: string = 'http://ec2-18-218-174-33.us-east-2.compute.amazonaws.com:8080/cruise/ride';
  //API_URL: string = 'http://localhost:8080/cruise/ride';
  API_URL: string = GlobalVariable.API_URL + "/ride";


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }


  public getByRiderId(riderId: number): Observable<Ride[]>{
    return this.http.post<Ride[]>(this.API_URL + "/find", riderId, this.httpOptions);
  }

  public postRide(ride: Ride): Observable<Ride>{
    return this.http.post<Ride>(this.API_URL + "/add", ride, this.httpOptions);
  }

  public updateRide(ride: Ride): Observable<Ride>{
    return this.http.post<Ride>(this.API_URL + "/update", ride, this.httpOptions);
  }
}

