import { Router } from '@angular/router';
import { ProviderService } from './../../services/provider.service';
import { PatientService } from './../../services/patient.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { Provider } from 'src/app/models/provider';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:User = new User();
  patient:Patient = new Patient();
  provider:Provider = new Provider();
  showForm:string = 'default';
  updatedUser:User = new User();
  changePassword:boolean = false;


  constructor(
    private authSvc: AuthService,
    private ptSvc: PatientService,
    private provSvc: ProviderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showForm = 'default'
    this.authSvc.getUserInfo().subscribe(
      data=>{
        this.user = data;
        if (this.checkPtOrProv(this.user)){
          this.ptSvc.userPatientInfo().subscribe(
            ptData=>{
              this.patient = ptData;
            },
            err=>{
              console.error(err);
              console.error('user-profile.component.ts.ngOnInit(): Failed to get Pt');
            })
        } else {
          this.provSvc.showProvider().subscribe(
            provData=>{
              this.provider = provData;
            },
            err=>{
              console.error(err);
              console.error('user-profile.component.ts.ngOnInit(): Failed to get provider');
            })
        }
      },
      err=>{
        console.error(err);
        console.error('user-profile.component.ts.ngOnInit(): Failed to get user');
      })
  }
  checkPtOrProv(user:User):boolean{
    if(user.role == 'patient'){
      return true;
    } else {
      return false;
    }
  }
  updateUser():void{
    if(this.updatedUser.password != null || this.updatedUser.password != ""){
      this.user.password = this.updatedUser.password;
    }
    this.authSvc.updateUserInfo(this.user).subscribe(
     data=>{
       this.user = data;
       this.authSvc.logout();
       this.router.navigateByUrl('/home');
      },
      err=>{
        console.error(err);
        console.error('user-profile.component.ts.updateProfileInfo():Failed');
      })
    }
  updatePt(pt:Patient):void{
    this.ptSvc.updatePt(pt).subscribe(
      data=>{
        this.patient = data;
        this.showForm = 'default'
      },
      err=>{
        console.error(err);
        console.error('user-profile.component.ts.updatePt():Failed');
      })
    }
    updateProv(prov:Provider):void{
      this.provSvc.updateProvider(prov).subscribe(
        data=>{
          this.provider = data;
          this.showForm = 'default'
      },
      err=>{
      console.error(err);
      console.error('user-profile.component.ts.updateProv():Failed');
      })
  }


}
