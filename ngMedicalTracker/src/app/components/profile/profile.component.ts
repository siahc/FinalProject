import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth:AuthService
  ) {}

  ngOnInit(): void {}

  checkRole(): string {
    return localStorage.getItem('role');
  }
  loggedin():boolean{
    return this.auth.checkLogin();
  }
}
