import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { GlobalVariable } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  //API_URL: string = 'http://ec2-18-218-174-33.us-east-2.compute.amazonaws.com:8080/cruise/car';
  //API_URL: string = 'http://localhost:8080/cruise/car';
  API_URL: string = GlobalVariable.API_URL + "/car";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public getAllAvailable(): Observable<Car[]>{
    return this.http.get<Car[]>(this.API_URL + "/find");
  }
}
