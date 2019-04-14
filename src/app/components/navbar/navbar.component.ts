import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  loggedUser;
  uName = sessionStorage.getItem("loggedUserName");

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem("loggedUserOb") != null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("loggedUserObj"));
      //this.uName = sessionStorage.getItem("loggedUserName");
    }
    else{
    //this.uName = "";
    }

  }
  //==check if user logged
  isUserLogged() {
    if (this.uName != null && this.uName != "") {
      return true;
    }
    else return false;
  }

  //==remove user from session storage==
  logout() {
    sessionStorage.setItem("loggedUserObj", "");
    sessionStorage.setItem("loggedUserName", "");
    alert("Logged out!");
  }

}
