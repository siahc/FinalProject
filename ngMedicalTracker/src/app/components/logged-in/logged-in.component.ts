import { MedicalHistoryService } from './../../services/medical-history.service';
import { MedicationService } from './../../services/medication.service';
import { User } from 'src/app/models/user';
import { MedicalHistory } from './../../models/medical-history';
import { Medication } from './../../models/medication';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from './../../services/patient.service';
import { Patient } from './../../models/patient';
import { Component, OnInit, Provider } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user = null;
  patients = [];
  medication = [];
  medicalHistory = [];
  rxDeets = null;
  hisDeets = null;
  rxUpdated = null;
  hisUpdated = null;
  medToAdd = new Medication();
  historyToAdd = new MedicalHistory();
  showMedToAdd = false;
  showHistoryForm = false;
  providers = [];
  myProvList = false;
  provId = null;


  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private rxService: MedicationService,
    private hisService: MedicalHistoryService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    try {
      this.patientService.userPatientInfo().subscribe(
        patient => {
        //TODO: get todo with this id, set selected
        console.log('Patient retrieved');
        this.user = patient;
        if(this.user != null){
          this.patientService.userPatientMedication().subscribe(
            data => {
              this.medication = data;
          },
          err=>{
            console.error('Loggedin.reload():index failed');
            console.error(err);

          }
          )
        }
        if(this.user != null){
          this.patientService.userMedicalHistory().subscribe(
            data => {
              this.medicalHistory = data;
          },
          err=>{
            console.error('Loggedin.reload():index failed');
            console.error(err);

          }
          )
        }
        if(this.user != null){
          this.patientService.patientProvList().subscribe(
            data => {
              this.providers = data;
          },
          err=>{
            console.error('Pt Providers:provider list failed');
            console.error(err);

          }
          )
        }

      },
      err => {
        this.router.navigateByUrl('notFound');
      }
   );
    } catch (error) {
      this.router.navigateByUrl('invalidId');
    }
  }

  updateHisComponent(): void {
    console.log(this.hisUpdated.diagnosis)
    this.hisService.updateMedHis(this.hisUpdated).subscribe(
      (good) => {
      console.log('update MedHis success')
      },
      (bad) => {
        console.error(bad);
      }
    );
    this.hisUpdated = null;
  }
  updateRxComponent(): void {
    this.rxService.updateRx(this.rxUpdated).subscribe(
      (good) => {
      console.log('update Rx success')
      },
      (bad) => {
        console.error(bad);
      }
    );
    this.rxUpdated = null;
  }
  createMed(): void {
    this.rxService.addMed(this.medToAdd).subscribe(
      (good) => {
        console.log('added med successfully')
      },
      (bad) => {
        console.error(bad);
      }
    );
  }
  createMedicalHistory(): void {
    this.hisService.createMedHis(this.historyToAdd).subscribe(
      (good) => {
        console.log('added medical history successfully')
      },
      (bad) => {
        console.error(bad);
      }
    );
  }

  destroyRX():void{
    this.rxService.deleteMed(this.rxDeets.id).subscribe(
      (good) => {
        console.log('medication deleted successfully')
      },
      (bad) => {
        console.log(bad);

      }
    );

  }

  destroyHist():void{
    this.hisService.deleteMedHis(this.hisDeets.id).subscribe(
      (good) => {
        console.log('Medical History deleted successfully')
      },
      (bad) => {
        console.log(bad);

      }
    );
  }
  removeProvider(id: number): void{
    this.patientService.rmvPtProvList(id).subscribe(
      (deleted) => {
      console.log(
        'Provider successfully removed'
      );
      },
      (err) => {
        console.error('Component.patient.ts.removeProviderFailed')
        console.error(err);
      }
    );
  }
  addProvider(id:number): void{
    this.patientService.addPtProvList(id).subscribe(
      (added) => {
      console.log('Provider successfully added');
      },
      (err) => {
        console.error('Component.patient.ts.addProviderFailed')
        console.error(err);
      }
    );
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
