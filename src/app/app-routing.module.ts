import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import { RequestComponent} from './components/request/request.component';

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'request', component: RequestComponent}]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
