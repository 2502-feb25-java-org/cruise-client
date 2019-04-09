import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent} from './components/request/request.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'request', component: RequestComponent},
<<<<<<< HEAD
  { path: 'login', component: LoginComponent }
=======
  { path: 'login', component: LoginComponent}
>>>>>>> master
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
