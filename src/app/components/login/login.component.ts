import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { RiderService } from '../../services/rider/rider.service'
import { Rider } from '../../models/rider/rider'
import { Address } from 'src/app/models/address/address';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  //===Strings===
  username: string;
  userErrMsg: string;
  pswErrMsg: string;
  loginErrMsg: string;
  rememberBox;

  //===Objects===
  rider: Rider;

  constructor(private rService: RiderService) { }

  ngOnInit() {
    if (localStorage.getItem('rememberMe') == 'true') {
      this.username = localStorage.getItem('storedUsername');
      this.rememberBox = localStorage.getItem('rememberMe');
    }
    else {
      this.username = "";
      this.rememberBox = false;
    }
  }

  //===Methods===
  validUsername(username: string) {
    if (username == null || username == "") {
      this.userErrMsg = "Please enter a username!";
      return false;
    }
    else {
      this.userErrMsg = "";
      return true;
    }
  }
  validPassword(password: string) {
    if (password == null || password == "") {
      this.pswErrMsg = "Please enter a password.";
    }
    else {
      this.pswErrMsg = "";
      return true;
    }
  }
  remember() {
    if (this.rememberBox) {

      localStorage.setItem('storedUsername', this.username);
      localStorage.setItem('rememberMe', this.rememberBox);
    }
    else {
      localStorage.setItem('rememberMe', this.rememberBox);
      localStorage.setItem('storedUsername', "");
    }
  }

  makeSam() {
    let sam = new Rider();
    sam.firstName = 'sam';
    sam.lastName = 'samson';
    sam.username = 'sam';
    sam.password = 'sam123';
    sam.dob = '09/23/1990';
    sam.email = 'sam@gamil.com';
    sam.phoneNumber = '908-456-2345';
    let address = new Address();
    address.line1 = "5 Manor Dr.";
    address.line2 = "Apt 6N";
    address.city = "Millburn";
    address.type = "Home";
    address.zipcode = "07090";
    address.country = "United States";
    sam.address = address;
    return sam;
  }

  login(username: string, password: string) {
    debugger;
    let sam = this.makeSam();
    this.rService.getByUsernameAndPassword(sam).subscribe(
      myRespBody => {
        
        console.log("Observable received");
        // if(myRespBody != null){
        //   this.rider = myRespBody;
        //   console.log("Rider recieved!" + JSON.stringify(this.rider));
        //   this.loginErrMsg = '';
        //   this.rService.globalRider = this.rider; //must make global rider public static
        // }
        // else{
        //   console.log("User not found");
        //   this.loginErrMsg = "Username or Password not found";
        // }
      },
      error => console.log('Observable not returned')
    );
  }

  //===Super function called by login_btn===
  submit(username: string, password: string) {
    this.login(username, password);
    // if (this.validUsername(username) && this.validPassword(password)) { 
    //   //make sure validPassword returns otherwise evaluated as void
    //   this.remember();
    //   this.login(username, password);
    //   window.location.href = "/home"; //redirects a user
    // }
    // else {
    //   alert('Please fillout all forms!');
    // }
  }

}
