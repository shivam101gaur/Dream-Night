import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  starCountArray = new Array(50)

  constructor() { }

  ngOnInit(): void {
  }

}
