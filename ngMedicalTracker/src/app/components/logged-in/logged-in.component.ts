import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalHistory } from './../../models/medical-history';
import { Medication } from './../../models/medication';
import { Message } from './../../models/message';
import { MedicalHistoryService } from './../../services/medical-history.service';
import { MedicationService } from './../../services/medication.service';
import { MessageService } from './../../services/message.service';
import { PatientService } from './../../services/patient.service';
import { Patient } from './../../models/patient';
import { Provider } from './../../models/provider';
// import { User } from 'src/app/models/user';
// import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user:Patient = new Patient();

  medication:Medication[] = [];
  medicalHistory:MedicalHistory[] = [];
  messages:Message[] = [];
  providers:Provider[] = [];

  rxDeets = null;
  hisDeets = null;
  rxHisDeets = null;
  dxMedDeets = null;

  rxEdit:Medication = new Medication();
  histEdit:MedicalHistory = new MedicalHistory();
  msgEdit:Message = new Message();

  provId = null;
  msgProvId = null;

  showView = 'medications';

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private rxService: MedicationService,
    private hisService: MedicalHistoryService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    try {
      this.patientService.userPatientInfo().subscribe(
        patient => {
        this.user = patient;
        if(this.user != null){
          this.patientService.userPatientMedication().subscribe(
            data => {
              this.medication = data;
          },
          err=>{
            console.error('Loggedin.ngOnInit():userPatientMedication() failed');
            console.error(err);
          }
          )
          this.patientService.userMedicalHistory().subscribe(
            data => {
              this.medicalHistory = data;
          },
          err=>{
            console.error('Loggedin.ngOnInit():userMedicalHistory() failed');
            console.error(err);
          })
          this.patientService.patientProvList().subscribe(
            data => {
              this.providers = data;
          },
          err=>{
            console.error('Loggedin.ngOnInit():patientProvList() failed');
            console.error(err);
          })
          this.messageService.getMessages().subscribe(
            data=>{
              this.messages = data;
            },
            err=>{
              console.error('Loggedin.ngOnInit():getMessages() failed');
              console.error(err);
            })
        }
      },
      err => {
        console.error('Logged-in.component.ts.reload(): User patient not found');
        console.error(err);
        this.router.navigateByUrl('home')
      });
    } catch (error) {
      this.router.navigateByUrl('home');
    }
  }

  updateHisComponent(hist): void {
    this.hisService.updateMedHis(hist).subscribe(
      (good) => {
      console.log('update MedHis success')
      this.reload();
      },
      (bad) => {
        console.error(bad);
      }
    );
    this.histEdit = null;
  }
  updateRxComponent(rx:Medication): void {
    this.rxService.updateRx(rx).subscribe(
      (good) => {
      console.log('update Rx success')
      this.reload();
    },
      (bad) => {
        console.error(bad);
      }
    );
    this.rxEdit = null;
  }
  setRxToUpdate(rx:Medication):void{
    this.rxEdit.name = rx.name;
    this.rxEdit.id = rx.id;
    this.rxEdit.description = rx.description;
    this.rxEdit.dose = rx.dose;
    this.rxEdit.frequency = rx.frequency;
    this.rxEdit.provider = rx.provider;
    this.rxEdit.comment = rx.comment;
    this.rxEdit.active = rx.active;
    this.showView = 'updateRx';
  }
  setHistToEdit(dx:MedicalHistory):void{
    this.histEdit.diagnosis = dx.diagnosis;
    this.histEdit.active = dx.active;
    this.histEdit.id = dx.id;
    this.histEdit.onset = dx.onset;
    this.histEdit.treatment = dx.treatment;
    this.showView = 'editHistory'
  }

  createMed(): void {
    this.rxService.addMed(this.rxEdit).subscribe(
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
    this.hisService.createMedHis(this.histEdit).subscribe(
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
        this.msgEdit = null;
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
        this.msgEdit = new Message;
        console.log("Message created successfully");
      },
      err => {
        console.error('Component.message.tx.crateMessage() failed');
        console.error(err);
      }
    )
  }

  setRxDeets(rx: Medication): void{
    this.showView = 'rxDetails'
    this.rxDeets = rx;
    this.getRxHis(this.rxDeets.id);
  }
  getRxHis(rxId: number): void {
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
  getDxMedications(medHisId: number): void {
    this.hisService.getDxMedications(medHisId).subscribe(
    data => {
      this.dxMedDeets = data;
      console.log('Diagnosis medications successfully retrieved');
    },
    (err) => {
      console.error('Component.MedicalHistory.ts.getDxMedicaitons() failed')
      console.error(err);
    })
  }
  setDxMedications(dx: History): void{
    this.showView = 'historyDetails'
    this.hisDeets = dx;
    this.getDxMedications(this.hisDeets.id);
    this.rxDeets = null;
  }

  reload(): void {
  this.user = new Patient();
  this.medication = [];
  this.medicalHistory = [];
  this.rxDeets = null;
  this.hisDeets = null;
  this.rxEdit = new Medication();
  this.histEdit = new MedicalHistory();
  this.msgEdit = new Message();
  this.providers = [];
  this.provId = null;
  this.showView = 'medications';

    try {
      this.patientService.userPatientInfo().subscribe(
        patient => {
        this.user = patient;
        if(this.user != null){
          this.patientService.userPatientMedication().subscribe(
            data => {
              this.medication = data;
          },
          err=>{
            console.error('Loggedin.reload().userPatientMedication() failed');
            console.error(err);
          })
          this.patientService.userMedicalHistory().subscribe(
            data => {
              this.medicalHistory = data;
          },
          err=>{
            console.error('Loggedin.reload().userMedicalHistory() failed');
            console.error(err);
          })
          this.patientService.patientProvList().subscribe(
            data => {
              this.providers = data;
          },
          err=>{
            console.error('Loggedin.reload().patientProvList() failed');
            console.error(err);
          })
          this.messageService.getMessages().subscribe(
            data=>{
              this.messages = data;
            },
            err=>{
              console.error('Loggedin.reload().getMessages() failed');
              console.error(err);
            })
        }
      },
      err => {
        console.error('Logged-in.component.ts.reload(): User patient not found');
        console.error(err);
        this.router.navigateByUrl('home')
      }
   );
    } catch (error) {
      this.router.navigateByUrl('home');
    }
  }
}
