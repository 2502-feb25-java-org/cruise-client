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
submit(username: string, password: string){
  if(this.validUsername(username) || this.validPassword(password)){
  
    this.login();
  }
  else{
    alert('Please fillout all forms!');
  }
  
  
}
validUsername(username: string){
  if(username == null || username == ""){
    this.uErrorMessage="Please enter a username!";
    return false;
  }
  else{
    this.uErrorMessage = "";
    return true;
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
login(){

}
}
