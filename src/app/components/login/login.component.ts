import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  uErrorMessage: string;
  pErrorMessage: string;

  constructor() { }

  ngOnInit() {
  }
test(){
  alert('hello!');
  //$("#user_message").html('changed');
}
validUsername(username: string){
  if(username == null || username == ""){
    this.uErrorMessage="Please enter a username!";
  }
  else{
    this.uErrorMessage = "";
  }
}
validPassword(password: string){
  if(password == null || password == ""){
    this.pErrorMessage = "Please enter a password.";
  }
  else{
    this.pErrorMessage = "";
  }
}
}
