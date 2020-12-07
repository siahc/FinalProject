import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from './../../services/patient.service';
import { Patient } from './../../models/patient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  selected = null;
  patients = [];

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    try {
      this.patientService.userPatientInfo().subscribe(
        patient => {
        //TODO: get todo with this id, set selected
        console.log('Todo retrieved, setting selected');
        this.selected = patient;
      },
      err => {
        this.router.navigateByUrl('notFound');
      }
   );
    } catch (error) {
      this.router.navigateByUrl('invalidId');
    }
  }

  reload(): void {
    this.patientService.index().subscribe(
      data => {
          this.patients = data;
      },
      err=>{
        console.error('Loggedin.reload():index failed');
        console.error(err);

      }
    )
  }
}
