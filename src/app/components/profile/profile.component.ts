import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


   uName = sessionStorage.getItem("loggedUsername");
   email = sessionStorage.getItem("loggedEmail");
   homeAddr = sessionStorage.getItem("loggedAddress1") + ", "
   + sessionStorage.getItem("loggedCity") + " " 
   + sessionStorage.getItem("loggedZip") + ", "
   + sessionStorage.getItem("loggedCountry");


  constructor() { }

  ngOnInit() {
    
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ZeroConfigComponent {}