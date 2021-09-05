import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  input!: string;
  usercode!: string;

  constructor(public router:Router) { }

  ngOnInit(): void {
    document.body.style.cursor = 'default';
  }
  generateUser() {
    this.usercode = btoa(unescape(encodeURIComponent(this.input)))
  }

  startdream(){
this.router.navigate(['../dream',this.usercode])
  }

}
