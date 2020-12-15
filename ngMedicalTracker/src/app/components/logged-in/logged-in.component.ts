import { ActiveHistoryPipe } from './../../pipes/active-history.pipe';
import { ActiveMedsPipe } from './../../pipes/active-meds.pipe';
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

  rxDeets:Medication = new Medication();
  hisDeets:MedicalHistory = new MedicalHistory();
  rxHisDeets = null;
  dxMedDeets = null;
  provDetails = new Provider();

  rxEdit:Medication = new Medication();
  histEdit:MedicalHistory = new MedicalHistory();

  provId = null;
  dxSelected:MedicalHistory = null;
  dxId= null;
  dxToAdd = null;

  showView = 'medications';
  showAllRx = false;
  showAllDx = false;

  msgProvId = null;
  msgEdit:Message = new Message();
  showSentMsg = false;
  msgSelectedId = null;
  message = new Message();
  msgToEdit = null;
  replyMsg = null;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private rxService: MedicationService,
    private hisService: MedicalHistoryService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    try {
      this.patientService.userPatientInfo().subscribe(
        patient => {
          this.user = patient;
          if(this.user != null){
            this.getMedications();
            this.getMedicalHistory();
            this.getProviders();
            this.getMessages();
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
  getMessages():void{
    this.messageService.getMessages().subscribe(
      data=>{
        this.messages = data;
      },
      err=>{
        console.error('Loggedin.ngOnInit():getMessages() failed');
        console.error(err);
      })
  }
  getMedicalHistory():void{
    this.patientService.userMedicalHistory().subscribe(
      data => {
        this.medicalHistory = data;
    },
    err=>{
      console.error('Loggedin.ngOnInit():userMedicalHistory() failed');
      console.error(err);
    })
  }
  getMedications():void{
    this.patientService.userPatientMedication().subscribe(
      data => {
        this.medication = data;
    },
    err=>{
      console.error('Loggedin.ngOnInit():userPatientMedication() failed');
      console.error(err);
    })
  }
  updateHisComponent(hist): void {
    this.hisService.updateMedHis(hist).subscribe(
      (good) => {
      console.log('update MedHis success')
      this.getMedicalHistory();
      this.rxHisDeets = hist;
      this.showView='historyDetails';
      },
      (bad) => {
        console.error(bad);
      });
    this.histEdit = null;
  }
  updateRxComponent(rx:Medication): void {
    this.rxService.updateRx(rx).subscribe(
      (good) => {
      console.log('update Rx success')
      this.getMedications();
      this.rxDeets = rx;
      this.rxEdit = new Medication();
      this.showView='rxDetails';
    },
      (bad) => {
        console.error(bad);
      });
    this.rxEdit = null;
  }
  setRxToUpdate(rx:Medication):void{
    this.rxEdit.name = rx.name;
    this.rxEdit.active = rx.active;
    this.rxEdit.comment = rx.comment;
    this.rxEdit.description = rx.description;
    this.rxEdit.dose = rx.dose;
    this.rxEdit.frequency = rx.frequency;
    this.rxEdit.id = rx.id;
    // this.rxEdit.medicalHistory = rx.medicalHistory;
    this.rxEdit.name = rx.name;
    this.rxEdit.provider = rx.provider;
    this.showView = 'updateRx';
  }
  addDxToRx(rx:Medication):void{
    this.rxService.addDxToRx(rx.id, this.dxId).subscribe(
      data=>{
        console.log('logged-in.component.ts.addDxToRx(): History linked to medication success');
        this.dxId = null;
        this.setRxDeets(rx);
      },
      err=>{
        console.error(err);
        console.log('logged-in.component.ts.addDxToRx(): Failed');
      })
  }
  setHistToEdit(dx:MedicalHistory):void{
    this.histEdit.diagnosis = dx.diagnosis;
    this.histEdit.active = dx.active;
    this.histEdit.id = dx.id;
    this.histEdit.onset = dx.onset;
    this.histEdit.treatment = dx.treatment;
    this.showView = 'editHistory'
  }
  setProviderDetails(prov:Provider):void{
    this.provDetails = prov;
    this.showView = 'providerDetails';
  }
  createMed(): void {
    this.rxService.addMed(this.rxEdit).subscribe(
      (good) => {
        console.log('added med successfully')
        this.getMedications();
        if (this.dxId){
          this.rxService.addDxToRx(good.id, this.dxId).subscribe(
            data=>{
              console.log('logged-in.component.ts.addDxToRx(): History linked to medication success');
              this.dxId = null;
            },
            err=>{
              console.error(err);
              console.log('logged-in.component.ts.addDxToRx(): Failed');
            })
        }
      },
      (bad) => {
        console.error(bad);
      });
      this.showView = 'medications';
  }
  createMedicalHistory(): void {
    this.hisService.createMedHis(this.histEdit).subscribe(
      (good) => {
        console.log('added medical history successfully')
        this.getMedicalHistory();
        this.showView='history';
      },
      (bad) => {
        console.error(bad);
      });
  }
  destroyRX():void{
    this.rxService.deleteMed(this.rxDeets.id).subscribe(
      (good) => {
        console.log('medication deleted successfully')
        this.getMedications();
        this.showView='medications'
      },
      (bad) => {
        console.log(bad);

      });
  }
  destroyHist():void{
    this.hisService.deleteMedHis(this.hisDeets.id).subscribe(
      (good) => {
        console.log('Medical History deleted successfully')
        this.getMedicalHistory();
        this.showView='history'
      },
      (bad) => {
        console.log(bad);

      });
  }
  getProviders():void{
    this.patientService.patientProvList().subscribe(
      data => {
        this.providers = data;
      },
      err=>{
        console.error(err);
      })
  }
  removeProvider(id: number): void{
    this.patientService.rmvPtProvList(id).subscribe(
      (deleted) => {
      console.log('Provider successfully removed');
      this.getProviders();
      this.showView = 'providers';
      },
      (err) => {
        console.error('Component.patient.ts.removeProviderFailed')
        console.error(err);
      })
  }
  addProvider(id:number): void{
    this.patientService.addPtProvList(id).subscribe(
      (added) => {
      console.log('Provider successfully added');
      this.getProviders();
      this.showView = 'providers';
      },
      (err) => {
        console.error('Component.patient.ts.addProviderFailed')
        console.error(err);
      })
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
      })
  }
  createMessage(message: Message): void{
    message.sentByPt = true;
    message.patientRead = true;
    this.messageService.createMessage(this.msgProvId, message).subscribe(
      data => {
        this.getMessages();
        this.msgEdit = new Message;
        console.log("Message created successfully");
        this.showView = 'messages';
        this.msgProvId = null;
        this.message = new Message();
      },
      err => {
        console.error('Component.message.tx.createMessage() failed');
        console.error(err);
      })
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
      this.rxHisDeets = null;
    })
  }
  getDxMedications(medHisId: number): void {
    this.hisService.getDxMedications(medHisId).subscribe(
    data => {
      this.dxMedDeets = data;
      console.log('Diagnosis medications successfully retrieved');
    },
    (err) => {
      this.dxMedDeets = null;
      console.error('Component.MedicalHistory.ts.getDxMedicaitons() failed')
      console.error(err);
    })
  }
  setDxMedications(dx: MedicalHistory): void{
    this.showView = 'historyDetails'
    this.hisDeets = dx;
    this.getDxMedications(this.hisDeets.id);
    this.rxDeets = null;
  }
  msgView(msg:Message):void{
    if (msg.providerRead != true){
      msg.providerRead = true;
      this.updateMessage(msg);
    }
    if (!this.msgSelectedId){
      this.msgSelectedId = msg.id;
    } else if (this.msgSelectedId == msg.id) {
      this.msgSelectedId = null;
    } else {
      this.msgSelectedId = null;
      this.msgSelectedId = msg.id;
    }
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
    })
  }
  replyMessage(message: Message, id: number): void{
    message.sentByPt = false;
    message.providerRead = true;
    message.title = 'RE: ' + this.replyMsg.title;
    this.messageService.createMessage(id, message).subscribe(
      data => {
        this.getMessages();
        this.message = new Message;
        this.replyMsg = null;
        console.log("Message created successfully");
      },
      err => {
        console.error('Component.message.tx.crateMessage() failed');
        console.error(err);
      })
  }
  cancelMsg():void{
    this.message = new Message();
    this.showView = 'messages';
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
          this.getMedications();
          this.getMedicalHistory();
          this.getProviders();
          this.getMessages();
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
}
