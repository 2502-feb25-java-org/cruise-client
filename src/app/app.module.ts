import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { DataTablesModule } from 'angular-datatables';
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
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { AgmDirectionModule } from 'agm-direction';
import { StringifyPipe } from './pipes/stringify.pipe';
import { DirectionsMapDirective } from './components/request/directives/google-map.directive';
import { GeolocationService } from './services/geolocation.service';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { DistanceFormatPipe } from './pipes/distance-format.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RequestComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent, 
    ProfileComponent, 
    FeedbackComponent,
    EditprofileComponent, 
    StringifyPipe,
    DirectionsMapDirective,
    DurationFormatPipe,
    DistanceFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyDaI3ZqczbOfJkDdzS2AJUODgWp7zsTcbM' }),
      apiKey: 'AIzaSyDaI3ZqczbOfJkDdzS2AJUODgWp7zsTcbM',
      libraries: ["places"]
    }),
    AgmDirectionModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
    RiderService,
    CarService,
    RideService,
    GeolocationService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
