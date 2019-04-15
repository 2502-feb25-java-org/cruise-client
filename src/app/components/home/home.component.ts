import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ifUserNotLogged() {
    if (sessionStorage.getItem("loggedUserObj") != null && sessionStorage.getItem("loggedUserObj") != "") {
      console.log("true");

      return false;
    }
    else {
      console.log("false");
      return true;
    }
  }
}
