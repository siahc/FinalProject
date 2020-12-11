import { Provider } from './../../models/provider';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { MedicationService } from 'src/app/services/medication.service';
import { MedicalHistory } from './../../models/medical-history';
import { Medication } from './../../models/medication';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { Patient } from './../../models/patient';
import { MessageService } from './../../services/message.service';
import { ProviderService } from './../../services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  patients = [];
  medications = [];
  history = [];
  messages = [];
  message = new Message();
  msgToEdit = null;
  ptToMsgId = null;
  user:Provider = new Provider();
  selectedPt = null;
  showView = '';
  viewItem = null;
  associatedItem = null;

  constructor(
    private messageService: MessageService,
    private providerService: ProviderService,
    private rxSvc: MedicationService,
    private dxSvc: MedicalHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.providerService.showProvider().subscribe(
        (provider) => {
          console.log('Provider.Component.ngOnInit(): Provider retrieved');
          this.user = provider;
          if (this.user != null) {
            this.getMessages();
            this.providerService.providerPatientList().subscribe(
              (data) => {
                console.log(
                  'Provider.Component.ngOnInit(): Patients List retrieved'
                );
                this.patients = data;
              },
              (err) => {
                console.error(
                  'Provider.Component.ngOnInit(): Failed to retreive patients list'
                );
                console.error(err);
              }
            );
          }
        },
        (err) => {
          this.router.navigateByUrl(
            'Provider.Component.ngOnInit(): Failed to retreive provider'
          );
          console.error(err);
        }
      );
    } catch (error) {
      this.router.navigateByUrl('invalid');
    }
  }

  viewHist(hist:MedicalHistory):void{
    this.showView = 'dxDetailed';
    this.viewItem = hist;
    this.viewHistAssocRx(hist);
  }

  viewRx(rx:Medication): void {
    this.showView = 'rxDetailed';
    this.viewItem = rx;
    this.viewRxAssocHist(rx);
  }

  returnToPtList(): void{
    this.showView = '';
    this.selectedPt = null;
    this.associatedItem = null;
  }

  viewPtMed(): void {
    this.providerService.providerViewPatientMeds(this.selectedPt.id).subscribe(
      (medsList) => {
        console.log('Component.provider.ts.viewPtMed(): Retreived med list');
        this.medications = medsList;
      },
      (err) => {
        console.error('Component.provider.ts.viewPtMed(): Failed');
        console.error(err);
      }
    );
  }

  viewPtHist(): void {
    this.providerService.providerViewPatientHist(this.selectedPt.id).subscribe(
      (histList) => {
        console.log(
          'Component.provider.ts.viewPtHist(): Retreived history list'
        );
        this.history = histList;
      },
      (err) => {
        console.error('Component.provider.ts.viewPtHist(): Failed');
        console.error(err);
      }
    );
  }

  viewRxAssocHist(rx:Medication):void{
    this.rxSvc.showRxHis(rx.id).subscribe(
      hist=>{
        console.log('components.provider.ts.viewRxAssocHist(rx):Return hist successfully');
        this.associatedItem = hist;
      },
      err=>{
        console.error(err);
        console.error('component.provider.ts.viewRxAssocHist(rx):Failure');
      }
    )
  }

  viewHistAssocRx(hist:MedicalHistory):void{
    this.dxSvc.getDxMedications(hist.id).subscribe(
      data=>{
        console.log('components.provider.ts.viewHistAssocRx(hist):Retreived meds list');
       this.associatedItem = data;
      },
      err=>{
        console.error(err);
        console.error('components.provider.ts.viewHistAssocRx(hist):Failed');

      }
    )
  }

  displayDetails(pt:Patient): void {
    this.selectedPt = pt;
    this.viewPtMed();
    this.viewPtHist();
  }

  removePatient(): void{
    this.providerService.providerRemovePatient(this.selectedPt.id).subscribe(
      (deleted) => {
      console.log(
        'Patient successfully removed'
      );
      this.reload();
      },
      (err) => {
        console.error('Component.provider.ts.removePatientFailed')
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
        this.ptToMsgId = null;
        console.log("Message created successfully");
      },
      err => {
        console.error('Component.message.tx.crateMessage() failed');
        console.error(err);
      }
    )
  }

  reload(): void {
    this.patients = [];
    this.medications = [];
    this.history = [];
    this.user = null;
    this.selectedPt = null;

    try {
      this.providerService.showProvider().subscribe(
        (provider) => {
          console.log('Provider.Component.ngOnInit(): Provider retrieved');
          this.user = provider;
          if (this.user != null) {
            this.providerService.providerPatientList().subscribe(
              (data) => {
                console.log(
                  'Provider.Component.ngOnInit(): Patients List retrieved'
                );
                this.patients = data;
              },
              (err) => {
                console.error(
                  'Provider.Component.ngOnInit(): Failed to retreive patients list'
                );
                console.error(err);
              }
            );
          }
        },
        (err) => {
          this.router.navigateByUrl(
            'Provider.Component.ngOnInit(): Failed to retreive provider'
          );
          console.error(err);
        }
      );
    } catch (error) {
      this.router.navigateByUrl('invalid');
    }
  }
}
