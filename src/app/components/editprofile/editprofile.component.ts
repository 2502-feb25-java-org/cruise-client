import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/models/rider/rider';
import { Address } from 'src/app/models/address/address';
import { RiderService } from 'src/app/services/rider/rider.service';

//s3 bucket import
import * as AWS from "aws-sdk";

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


  //code for uploading to AWS s3 bucket
  fileEvent(fileInput: any) {
    console.log("inside fileEvent()");
    const AWSService = AWS;
    const region = 'us-east-2';
    const bucketName = 'cruise-imgs';
    const IdentityPoolId = 'arn:aws:iam::763693537926:role/Cognito_RevatureCruiseClientAuth_Role';
    const file = fileInput.target.files[0];
  //Configures the AWS service and initial authorization
    AWSService.config.update(
      {region: region,
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
    //this.image = file.name;   //**commented because image gives error
    s3.upload({ Key: file.name, Bucket: 'cruise-imgs', Body: file, ACL: 'public-read'}, function (err, data) {
     if (err) {
       console.log(err, 'there was an error uploading your file');
     }
   });
  }

}
