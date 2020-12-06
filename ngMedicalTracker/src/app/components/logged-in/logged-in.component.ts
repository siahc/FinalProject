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


  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);

    // const idStr = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    let idStr = 1

    if (idStr) {


    try {
      // const id: number = Number.parseInt(idStr, 10);
      this.patientService.show(1).subscribe(
        patient => {
        //TODO: get todo with this id, set selected
        console.log('Todo retrieved, setting selected');
        this.selected = patient;
      },
      err => {
        //TODO: If todo doesn't exist, forward to not found page
        console.log('Todo ' + id + ' not found.');
        this.router.navigateByUrl('notFound');
      }
   );
    } catch (error) {
      //TODO: forward to not found page
      this.router.navigateByUrl('invalidId');
    }
  }
  else{}
    // this.reload();

  }
  // reload(): void {
  //   this.patientService.index().subscribe(
  //     todos => {

  //     }
  //   )
  // }
}
