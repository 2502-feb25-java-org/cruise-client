import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rider } from 'src/app/models/rider/rider';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  //==variables==
  name: string ='This is my singleton rider service';

  API_URL: string = 'http://ec2-18-218-174-33.us-east-2.compute.amazonaws.com:8080/cruise/rider';
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

  public getByUsernameAndPassword(username: string, password: string): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/get",[username, password]);
  }

  public postRider(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/add", rider, this.httpOptions);
  }

}
