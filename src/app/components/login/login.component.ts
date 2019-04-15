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

  constructor(private riderService: RiderService) { }

  ngOnInit() {
    //==Login Storage
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

  login(username: string, password: string) {
    this.riderService.getByUsernameAndPassword(username, password).subscribe(
      myRespBody => {
        
        console.log("Observable received");
        if(myRespBody != null){
          this.rider = myRespBody;
          sessionStorage.setItem("loggedUserObj", JSON.stringify(this.rider));
          sessionStorage.setItem("loggedUserName", this.rider.username);
          console.log("Rider recieved!" + JSON.stringify(this.rider));
          this.loginErrMsg = '';          
          window.location.href = "/home"; //redirects a user
        }
        else{
          console.log("User not found");
          this.loginErrMsg = "Username or Password not found";
        }
      },
      error => console.log('Observable not returned')
    );
  }

  //===Super function called by login_btn===
  submit(username: string, password: string) {
    if (this.validUsername(username) && this.validPassword(password)) { 
      //make sure validPassword returns otherwise evaluated as void
      this.remember();
      this.login(username, password);
    }
    else {
      alert('Please fillout all forms!');
    }
  }

}
