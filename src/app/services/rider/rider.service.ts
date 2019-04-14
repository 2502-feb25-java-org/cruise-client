import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rider } from 'src/app/models/rider/rider';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  API_URL: string = 'http://ec2-18-218-174-33.us-east-2.compute.amazonaws.com:8080/cruise/rider';

  public globalRider: Rider;
 
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public postRider(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/add", rider, this.httpOptions);
  }

  public getByUsernameAndPassword(username: string, password: string): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/find", [username, password], this.httpOptions);
  }
}
