import { PatientService } from './../../services/patient.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  newUser: User = new User();
  newPatient: Patient = new Patient();

  constructor(
    private auth: AuthService,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {}

  register() {
    this.auth.register(this.newUser).subscribe(
      (data) => {
        console.log('register sign-up component method');
        this.auth.login(this.newUser.username, this.newUser.password).subscribe(
          (data) => {
            console.log('Sign-up successful');
            this.registerInformation();
          },
          (err) => {
            console.error(err);
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  registerInformation() {
    this.patientService.createPatient(this.newPatient).subscribe(
      (data) => {
        console.log('create patient successful');
        this.router.navigateByUrl('/howto');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
