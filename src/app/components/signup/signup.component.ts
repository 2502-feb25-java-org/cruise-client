import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  test: string;
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
  zipcode: string;
  picture: string;


  constructor(private riderService: RiderService) {
    console.log('in SignUpComponent constructor. instantiating RiderService');
    console.log(riderService.name);
  }

  ngOnInit() {
    console.log('in SignupComponent ngOnInit');
    this.test = this.riderService.test();
    //this.addRider();
    this.loadLocalVal();

  }
  addRider() {
    let rider = new Rider();
    let address = new Address;
    rider.firstName = this.firstName;
    rider.lastName = this.lastName;
    rider.username = this.newUserName;
    rider.password = this.password;
    rider.email = this.email;
    rider.phoneNumber = this.phoneNumber;
    rider.dob = this.dob;
    address.type = this.addressType;
    address.line1 = this.addressLine1;
    address.line2 = this.addressLine2;
    address.city = this.city;
    address.country = "United States";
    address.zipcode = this.zipcode;     //added zipcode
    rider.address = address;

    if(this.check(this.firstName) && this.check(this.lastName)&& this.check(this.newUserName)
    && this.check(this.password)&& this.check(this.password)&& this.check(this.email)
    && this.check(this.phoneNumber)&& this.check(this.dob)&& this.check(this.addressLine1)
    && this.check(this.addressType)&& this.check(this.city)
    && this.check(this.zipcode)) {
      alert("Sign up successfull!");
          //console.log("Trying to add rider:" + rider.firstName + "Who was born on: " + rider.DOB);
    rider.address = address;
    //console.log("Trying to add rider:" + rider.firstName + "Who was born on: " + rider.DOB);
    console.log(JSON.stringify(rider));
    this.riderService.postRider(rider).subscribe(
      r => {
        console.log(r.firstName + " added successfully");
        this.delSignUp();
        //window.location.href = "/login";
      },
      error => console.log('ERR')
    );
    
    }
    else{
      alert("Signup failed, please check your credentials!")
    }


  }

  //===LocalStorage===
  saveSignUp() {
    localStorage.setItem("firstname", this.firstName);
    localStorage.setItem("lastname", this.lastName);
    localStorage.setItem("newUsername", this.newUserName);
    localStorage.setItem("email", this.email);
    localStorage.setItem("phonenumber", this.phoneNumber);
    localStorage.setItem("dob", this.dob);
    localStorage.setItem("addressType", this.addressType);
    localStorage.setItem("addressLine1", this.addressLine1);
    localStorage.setItem("addressLine2", this.addressLine2);
    localStorage.setItem("city", this.city);
    localStorage.setItem("zipcode", this.zipcode);
  }
  loadLocalVal() {
    this.firstName = this.notNull("firstname");
    this.lastName = this.notNull("lastname");
    this.newUserName = this.notNull("newUsername");
    this.email = this.notNull("email");
    this.phoneNumber = this.notNull("phonenumber");
    this.dob = this.notNull("dob");
    this.addressType = this.notNull("addressType");
    this.addressLine1 = this.notNull("addressLine1");
    this.addressLine2 = this.notNull("addressLine2");
    this.city = this.notNull("city");
    this.zipcode = this.notNull("zipcode");
  }
  notNull(checkStr: string) {
    var localStr: string = localStorage.getItem(checkStr);
    if (localStr != null && localStr != "") {
      return localStr;
    }
    else {
      return "";
    }
  }

  delSignUp() {
    localStorage.setItem("firstname", "");
    localStorage.setItem("lastname", "");
    localStorage.setItem("newUsername", "");
    localStorage.setItem("email", "");
    localStorage.setItem("phonenumber", "");
    localStorage.setItem("dob", "");
    localStorage.setItem("addressType", "");
    localStorage.setItem("addressLine1", "");
    localStorage.setItem("addressLine2", "");
    localStorage.setItem("city", "");
    localStorage.setItem("zipcode", "");
  }

  check(cf: string){
    if(cf != null && cf != "" ){
      return true;
    }
    return false;
  }
}
