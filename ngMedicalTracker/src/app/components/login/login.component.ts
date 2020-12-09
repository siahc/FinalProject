import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authUser:User = new User();
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.auth.login(this.authUser.username, this.authUser.password).subscribe(
      next => {
        console.log('Component.Login.login():User logged in successfully');
        let test:string = localStorage.getItem('role');
        console.log(test);

        if(test == 'provider'){
          this.router.navigateByUrl('provider');
        }
        this.router.navigateByUrl('logged-in');

      },
      error=>{
        console.error(error);
        console.error('Component.Login.login():Failed login');


      }
    )
  }

}
