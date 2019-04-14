import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  API_URL: string = 'http://localhost:8080/cruise/car';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public getAllAvailable(): Observable<Car>{
    return this.http.get<Car>(this.API_URL + "/find");
  }
}
