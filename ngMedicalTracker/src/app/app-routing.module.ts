import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HowToComponent } from './components/how-to/how-to.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {path: 'logged-in', component: LoggedInComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'howto', component: HowToComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
