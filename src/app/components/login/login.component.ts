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
  rememberBox;

  constructor() { }

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

  submit(username: string, password: string) {
    if (this.validUsername(username) || this.validPassword(password)) {
      this.remember();
      this.login();
    }
    else {
      alert('Please fillout all forms!');
    }
  }
  validUsername(username: string) {
    if (username == null || username == "") {
      this.uErrorMessage = "Please enter a username!";
      return false;
    }
    else {
      this.uErrorMessage = "";
      return true;
    }
  }
  validPassword(password: string) {
    if (password == null || password == "") {
      this.pErrorMessage = "Please enter a password.";
    }
    else {
      this.pErrorMessage = "";
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

  login() {

  }
}
