import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider/rider.service'
import { Address } from 'src/app/models/address/address'
import { Rider } from '../../models/rider/rider'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser =JSON.parse( sessionStorage.getItem("loggedUserObj"));

<<<<<<< HEAD

   uName = sessionStorage.getItem("loggedUsername");
   email = sessionStorage.getItem("loggedEmail");
   homeAddr = sessionStorage.getItem("loggedAddress1") + ", "
   + sessionStorage.getItem("loggedCity") + " " 
   + sessionStorage.getItem("loggedZip") + ", "
   + sessionStorage.getItem("loggedCountry");


=======
  name = this.loggedUser.firstName + " " + this.loggedUser.lastName;
   uName = this.loggedUser.username;
   email = this.loggedUser.email;
   homeAddr = this.loggedUser.address.line1 + ", "+ this.loggedUser.address.line2 + ", "
   + this.loggedUser.address.city + ", " + this.loggedUser.address.state 
   + this.loggedUser.address.country + ", " 
   + this.loggedUser.address.zipcode;
   
   profDob = this.loggedUser.dob;
>>>>>>> 524702abc56bbcb734615cdfb2b2ad790c3330fb
  constructor() { }

  ngOnInit() {
    
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ZeroConfigComponent {}