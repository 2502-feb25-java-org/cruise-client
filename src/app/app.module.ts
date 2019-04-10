import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
<<<<<<< HEAD
import { DataTablesModule } from 'angular-datatables';

=======
>>>>>>> a74556589ca300bb673a44da0ef47c6a23a47236
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestComponent } from './components/request/request.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RiderService } from './services/rider/rider.service';
import { CarService } from './services/car/car.service';
import { RideService } from './services/ride/ride.service';
import { RouteService } from './services/route/route.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RequestComponent,
    SignupComponent,   
    FooterComponent, 
   ProfileComponent,
    HomeComponent, 
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyDaI3ZqczbOfJkDdzS2AJUODgWp7zsTcbM' }),
      DataTablesModule
  ],
  providers: [
    RiderService,
    CarService,
    RideService,
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
