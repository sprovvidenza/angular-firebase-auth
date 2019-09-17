import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {WelcomeComponent} from './components/welcome/welcome.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
