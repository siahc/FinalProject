import { PatientService } from './../../services/patient.service';
import { ProviderService } from './../../services/provider.service';
import { Component, OnInit, Provider } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { MedicationService } from 'src/app/services/medication.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  patients = [];
  user = null;


  constructor(
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private rxService: MedicationService,
    private hisService: MedicalHistoryService,
    private showPatients: PatientService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    try {
      this.providerService.showProvider().subscribe(
        provider => {
        //TODO: get todo with this id, set selected
        console.log('Provider retrieved');
        this.user = provider;
        if(this.user != null){
          this.providerService.providerPatientInformation().subscribe(
            data => {
              this.patients = data;
          },
          err=>{
            console.error('Loggedin.reload():index failed');
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

  reload(): void {
    this.providerService.providerPatientInformation().subscribe(
      data => {
          this.patients = data;
      },
      err=>{
        console.error('Patients.reload():patients failed');
        console.error(err);

      }
    )
  }
}
