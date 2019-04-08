import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
=======
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestComponent } from './components/request/request.component';
>>>>>>> origin

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent
=======
    NavbarComponent,
    RequestComponent
>>>>>>> origin
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
