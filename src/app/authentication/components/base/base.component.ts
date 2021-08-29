import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  starCountArray = new Array(50)


  constructor() { }

  ngOnInit(): void {
  }

}
