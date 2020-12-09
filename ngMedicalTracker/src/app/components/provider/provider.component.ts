import { Patient } from './../../models/patient';
import { ProviderService } from './../../services/provider.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  patients = [];
  medications = [];
  history = [];
  user = null;
  selectedPt = null;

  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  displayDetails(pt:Patient): void {
    this.selectedPt = pt;
    this.viewPtMed();
    this.viewPtHist();
  }

  reload(): void {
    this.providerService.providerPatientList().subscribe(
      (data) => {
        this.patients = data;
        this.medications = [];
        this.history = [];
        this.selectedPt = [];
      },
      (err) => {
        console.error('Patients.reload():patients failed');
        console.error(err);
      }
    );
  }
}
