import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rider } from 'src/app/models/rider/rider';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  name: string ='This is my singleton rider service';

  API_URL: string = 'http://localhost:8080/cruise/rider';
 
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public test(): string{
    return 'properly injected service';
  }

  public getUserByUsername(username: string): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL, username);
  }

  public postRider(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL, rider, this.httpOptions);
  }

}
