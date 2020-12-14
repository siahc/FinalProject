import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { IonicModule } from '@ionic/angular';
import { ProviderComponent } from './components/provider/provider.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ActiveMedsPipe } from './pipes/active-meds.pipe';
import { ActiveHistoryPipe } from './pipes/active-history.pipe';
import { PatientSentMessagePipe } from './pipes/patient-sent-message.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    LoggedInComponent,
    SignUpComponent,
    HowToComponent,
    ProviderComponent,
    ProfileComponent,
    UserProfileComponent,
    ActiveMedsPipe,
    ActiveHistoryPipe,
    PatientSentMessagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [
    AuthService,
    ActiveMedsPipe,
    ActiveHistoryPipe,
    PatientSentMessagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
