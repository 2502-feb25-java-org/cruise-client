import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rider } from 'src/app/models/rider/rider';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  //==variables==
  name: string ='This is my singleton rider service';

  API_URL: string = 'http://localhost:8081/cruise/rider';
  //
  //==user==
  public globalRider: Rider;
 
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public test(): string{
    return 'properly injected service';
  }

  // public getAll(): Observable<Rider[]> {
  //   return this.http.get<Rider[]>(this.API_URL + "/getall");
  // }
  
  // public getByUsernameAndPassword(username: string, password: string): Observable<Rider>{
  //   console.log("Inside RiderService getByUsernameAndPassword method");
  //   return this.http.post<Rider>(this.API_URL + "/get", [username, password], this.httpOptions);
  // }
  public getByUsernameAndPassword(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/add", rider, this.httpOptions);
  }

  public postRider(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/add", rider, this.httpOptions);
  }

}
