import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {
  test = localStorage.getItem('role');
  constructor() { }

  ngOnInit(): void {
  }
  checkRole():string{
    return localStorage.getItem('role');
  }
}
