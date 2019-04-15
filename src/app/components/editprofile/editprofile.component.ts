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
  }

  update() {
    let rider = new Rider();
    let address = new Address;
    let oldRider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
    rider.id = oldRider.id;
    //==firstname
    if(this.firstName == "" || this.firstName == null){
      rider.firstName = oldRider.firstName;
    }
    else{
      rider.firstName = this.firstName;
    }
    //==lastname
    if(this.lastName == "" || this.lastName == null){
      console.log("Last names:" + rider.lastName + " " + oldRider.lastName);
      rider.lastName = oldRider.lastName;
    }
    else{
      rider.lastName = this.lastName;
    }
    //==username
    if(this.newUserName == "" || this.newUserName == null){
      rider.username = oldRider.username;
    }
    else{
      rider.username = this.newUserName;
    }
    //==password
    if(this.password == "" || this.password == null){
      rider.password = oldRider.password;
    }
    else{
      rider.password = this.password;
    }
    //==email
    if(this.email == "" || this.email == null){
      rider.email = oldRider.email;
    }
    else{
      rider.email = this.email;
    }
    //==phoneNumber
    if(this.phoneNumber == "" || this.phoneNumber == null){
      rider.phoneNumber = oldRider.phoneNumber;
    }
    else{
      rider.phoneNumber = this.phoneNumber;
    }
    //==dob
    if(this.dob == "" || this.dob == null){
      rider.dob = oldRider.dob;
    }
    else{
      rider.dob = this.dob;
    }
    //==address type
    if(this.addressType == "" || this.addressType == null){
      address.type = oldRider.address.type;
    }
    else{
      address.type = this.addressType;
    }
    //==address Line1
    if(this.addressLine1 == "" || this.addressLine1 == null){
      address.line1 = oldRider.address.line1;
    }
    else{
      address.line1 = this.addressLine1;
    }
    //==address line2
    if(this.addressLine2 == "" || this.addressLine2 == null){
      address.line2 = oldRider.address.line2;
    }
    else{
      address.line2 = this.addressLine2;
    }
    //==City
    if(this.city == "" || this.city == null){
      address.city = oldRider.address.city;
    }
    else{
      address.city = this.city;
    }
    //==State
    if(this.state == "" || this.state == null){
      address.state = oldRider.address.city;
    }
    else{
      address.state = this.state;
    }
    //==zipcode
    if(this.zipcode == "" || this.zipcode == null){
      address.zipcode = oldRider.address.zipcode;      
    }
    else{
      address.zipcode = this.zipcode;
    }
    address.country = "United States";
    rider.address = address;

    console.log(JSON.stringify(rider));
    this.riderService.updateRider(rider).subscribe(
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
