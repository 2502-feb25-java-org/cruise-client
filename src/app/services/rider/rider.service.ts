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
<<<<<<< HEAD
  //API_URL: string = 'http://localhost:8080/cruise/rider';

=======
  //
>>>>>>> 74e22fe459f4b425e6f71ea08c6e5d17c8119600
  //==user==
  public globalRider: Rider;
 
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public test(): string{
    return 'properly injected service';
  }

  public getByUsernameAndPassword(rider: Rider): Observable<Rider>{
    console.log("testing");
    return this.http.post<Rider>(this.API_URL + "/get",rider, this.httpOptions);
  }

  public postRider(rider: Rider): Observable<Rider>{
    return this.http.post<Rider>(this.API_URL + "/add", rider, this.httpOptions);
  }

}
