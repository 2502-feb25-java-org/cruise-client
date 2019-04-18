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
  picture: any
  testpic: string;
  str : string;
  profImgURL : string;

  s3BucketUrl : string = "https://s3.amazonaws.com/revature-cruise-client-imgs/";

  constructor(private riderService: RiderService) { }

  ngOnInit() 
  {
    this.profImgURL = sessionStorage.getItem("imgURL");

    if(sessionStorage.getItem("loggedUserObj") == null || sessionStorage.getItem("loggedUserObj") == ""){
      alert("Please sign in!");
      window.location.href= "/login";
    }
    else{
      this.oldRider = JSON.parse(sessionStorage.getItem("loggedUserObj"));
    }
  }

  update() 
  {
    this.oldRider.picture = sessionStorage.getItem("imgURL");
    console.log(JSON.stringify(this.oldRider));
    this.riderService.updateRider(this.oldRider).subscribe(
      r => 
      {
        console.log(r.firstName + " added successfully");
        this.updatedRider = r;
        sessionStorage.setItem("loggedUserObj", JSON.stringify(this.updatedRider));
        window.location.href = "/users";
      },
      error => console.log('Observable not returned')
    );
  }

  //code for uploading to AWS s3 bucket
  fileEvent(fileInput: any) 
  {
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'revature-cruise-client-imgs';
    const IdentityPoolId = 'us-east-1:0c838622-9be1-4f98-b122-cc4dbcc698f7';
    const file = fileInput.target.files[0];

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
      params: { Bucket: 'revature-cruise-client-imgs' }
    });
    //I store this in a variable for retrieval later
    //this.image = file.name;   **commented because image gives error
    
    this.str = this.testpic.substring(12);
    sessionStorage.setItem("imgURL", this.s3BucketUrl + this.str);
    //console.log(this.str);

    s3.upload({ Key: file.name, Bucket: 'revature-cruise-client-imgs', Body: file, ACL: 'public-read' }, function (err, data) {
      if (err)
        console.log(err, 'there was an error uploading your file');

      else
      {
        console.log("onchange()-- picture: " + this.testpic)
      }
    });

    document.getElementById("imageUpload").onchange = () => 
    {
      this.picture = document.getElementById("imageUpload").onchange;
      alert("Selected File" + this.picture.name);
    }
  }

}
