import { IonicModule } from '@ionic/angular';
import { Message } from './../../models/message';
import { MessageService } from './../../services/message.service';
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
  message = new Message();
  messages = [];
  myMessages = false;
  msgToEdit = null;
  msgProvId = null;
  rxHisDeets = null;
  dxMedDeets = null;




  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private rxService: MedicationService,
    private hisService: MedicalHistoryService,
    private messageService: MessageService,
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
          this.getMessages();
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
      this.reload();
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
      this.reload();
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
        this.reload();
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
        this.reload();
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
        this.reload();
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
        this.reload();
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
      this.reload();
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
      this.reload();
      },
      (err) => {
        console.error('Component.patient.ts.addProviderFailed')
        console.error(err);
      }
    );
  }
  getMessages(): void {
    this.messageService.getMessages().subscribe(
    data => {
      this.messages = data;
      console.log('Messages successfully retrieved');
    },
    (err) => {
      console.error('Component.message.ts.getMessages() failed')
      console.error(err);
    }
    )
  }
  deleteMessage(message: Message): void {
    this.messageService.deleteMessage(message).subscribe(
      data => {
       this.getMessages();
        console.log("Message deleted successfully");
      },
      (err) => {
        console.error('Component.message.ts.deleteMessages() failed')
        console.error(err);
      }
    )
  }
  updateMessage(message: Message): void{
    this.messageService.updateMessage(message).subscribe(
      data => {
        this.getMessages();
        console.log("Message updated successfully");
        this.msgToEdit = null;
      },
    (err) => {
      console.error('Component.message.ts.updateMessages() failed');
      console.error(err);
    }
    )
  }
  createMessage(message: Message, id: number): void{
    this.messageService.createMessage(id, message).subscribe(
      data => {
        this.getMessages();
        this.message = new Message;
        console.log("Message created successfully");
      },
      err => {
        console.error('Component.message.tx.crateMessage() failed');
        console.error(err);
      }
    )
  }
  getShowRxHis(rxId: number): void {
    this.rxService.showRxHis(rxId).subscribe(
    data => {
      this.rxHisDeets = data;
      console.log('Rx History successfully retrieved');
    },
    (err) => {
      console.error('Component.Medication.ts.getRxHisDeets() failed')
      console.error(err);
    }
    )
  }
  setRxDeets(rx: Medication): void{
    this.rxDeets = rx;
    this.getShowRxHis(this.rxDeets.id);
  }

  getDxMedications(medHisId: number): void {
    this.hisService.getDxMedications(medHisId).subscribe(
    data => {
      this.dxMedDeets = data;
      console.log('Diagnosis medications successfully retrieved');
    },
    (err) => {
      console.error('Component.MedicalHistory.ts.getDxMedicaitons() failed')
      console.error(err);
    }
    )
  }
  setDxMedications(dx: History): void{
    this.hisDeets = dx;
    this.getDxMedications(this.hisDeets.id);
  }


  reload(): void {
  this.user = null;
  this.patients = [];
  this.medication = [];
  this.medicalHistory = [];
  this.rxDeets = null;
  this.hisDeets = null;
  this.rxUpdated = null;
  this.hisUpdated = null;
 this.medToAdd = new Medication();
  this.historyToAdd = new MedicalHistory();
  // this.showMedToAdd = false;
  // this.showHistoryForm = false;
  this.providers = [];
  // this.myProvList = false;
  this.provId = null;

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
}
