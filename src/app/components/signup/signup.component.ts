import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  test: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  DOB: Date;
  addressLine1: string;
  addressLine2: string;
  addressType: string;
  city: string;
  zipcode: string;
  picture: Blob;



  constructor(private riderService: RiderService) {
    console.log('in SignUpComponent constructor. instantiating RiderService');
    console.log(riderService.name);
   }

  ngOnInit() {
    console.log('in SignupComponent ngOnInit');
    this.test = this.riderService.test();
    this.addRider();
  }

  addRider() {
    let rider = new Rider();
    let address = new Address;
    rider.firstName = this.firstName;
    rider.lastName = this.lastName;
    rider.username = this.userName;
    rider.password = this.password;
    rider.email = this.email;
    rider.phoneNumber = this.phoneNumber;
    rider.DOB = this.DOB;
    address.type = this.addressType;
    address.line1 = this.addressLine1;
    address.line2 = this.addressLine2;
    address.city = this.city;
    address.country = "United States";
    rider.addresses = [address];
    //console.log("Trying to add rider:" + rider.firstName + "Who was born on: " + rider.DOB);
    console.log(JSON.stringify(rider));
    this.riderService.postRider(rider).subscribe(
      r => {
        console.log(r + "addded successfully");
      },
      error => console.log('ERR')
    );




  }

}
