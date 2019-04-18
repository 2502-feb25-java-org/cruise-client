import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

//s3 bucket import
import * as AWS from "aws-sdk";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
  missingForm: string = "";


  constructor(private riderService: RiderService) {
    console.log('in SignUpComponent constructor. instantiating RiderService');
  }

  ngOnInit() {
    console.log('in SignupComponent ngOnInit');
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
    address.state = this.state;       //added State
    address.zipcode = this.zipcode;
    address.country = "United States";
    rider.address = address;

    if (this.check(this.firstName, "First Name") && this.check(this.lastName, "Last Name")
      && this.check(this.newUserName, "Desired Username") && this.check(this.password, "Password")
      && this.check(this.email, "Email") && this.check(this.phoneNumber, "Phone Number") &&
      this.check(this.dob, "Date of Birth") && this.check(this.addressLine1, "Address Line 1")
      && this.check(this.city, "City") && this.check(this.state, "State")
      && this.check(this.zipcode, "Zipcode")) {
      alert("Sign up successfull!");
      //console.log("Trying to add rider:" + rider.firstName + "Who was born on: " + rider.DOB);
      rider.address = address;
      //console.log("Trying to add rider:" + rider.firstName + "Who was born on: " + rider.DOB);
      console.log(JSON.stringify(rider));
      this.riderService.postRider(rider).subscribe(
        r => {
          console.log(r.firstName + " added successfully");
          this.delSignUp();
          window.location.href = "/login";
        },
        error => console.log('Observable not returned')
      );

    }
    else {
      alert("Signup failed," + this.missingForm);
      this.missingForm = "";

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
    localStorage.setItem("state", this.state);
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
    this.state = this.notNull("state");
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
    localStorage.setItem("state", "");
    localStorage.setItem("zipcode", "");
    this.missingForm = "";
  }

  check(cf: string, formID: string) {
    if (cf != null && cf != "") {
      return true;
    }
    else {
      this.missingForm = "Please fill in the following form: \n" + formID;
      console.log("empty missing form" + this.missingForm);
      return false;
    }
  }

  //code for uploading to AWS s3 bucket
  fileEvent(fileInput: any) {
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'cruise-imgs';
    const IdentityPoolId = 'us-east-1:0c838622-9be1-4f98-b122-cc4dbcc698f7';
    const file = fileInput.target.files[0];
    console.log(fileInput.target.file.name);
  //Configures the AWS service and initial authorization
    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });
  //adds the S3 service, make sure the api version and bucket are correct
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'cruise-imgs'}
    });
  //I store this in a variable for retrieval later
    //this.image = file.name;   **commented because image gives error
    s3.upload({ Key: file.name, Bucket: 'cruise-imgs', Body: file, ACL: 'public-read'}, function (err, data) {
     if (err) {
       console.log(err, 'there was an error uploading your file');
     }
   });
  }
}
