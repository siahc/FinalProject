import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
     private auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  loggedin():boolean{
    return this.auth.checkLogin();
  }
}
