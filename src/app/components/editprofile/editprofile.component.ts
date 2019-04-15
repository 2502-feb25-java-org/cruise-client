import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RiderService } from 'src/app/services/rider/rider.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  oldRider: Rider;
  rider: Rider;
  updatedRider: Rider;
  addressObj: Address;

  firstName: string;
  lastName: string;
  newUserName: string;
  password: string;
  email: string;
  phoneNumber: string;
  dob: string;
  addressLine1: string;
  addressLine2: string;
  addressType: string;
  city: string;
  state: string;
  zipcode: string;
  picture: string;

  constructor(private riderService: RiderService) { }

  ngOnInit() {
    if(sessionStorage.getItem("loggedUserObj") == null || sessionStorage.getItem("loggedUserObj") == ""){
      alert("Please sign in!");
      window.location.href= "/login";
    }
    else{
      this.oldRider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
    }
  }

  update() {
    console.log(JSON.stringify(this.oldRider));
    this.riderService.updateRider(this.oldRider).subscribe(
      r => {
        console.log(r.firstName + " added successfully");
        this.updatedRider = r;
        sessionStorage.setItem("loggedUserObj", JSON.stringify(this.updatedRider));
        window.location.href = "/users";
      },
      error => console.log('Observable not returned')
    );
  }
}
