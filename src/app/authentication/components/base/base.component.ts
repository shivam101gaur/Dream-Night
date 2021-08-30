import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  darksky:boolean=false;
  rotatesky:boolean=true;
  attachedString:string;
  starCountArray = new Array(25)

  // call this to Disable
  disableScroll() {

    var supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
      }));

      var wheelOpt = supportsPassive ? { passive: false } : false;
      var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    } catch (e) { }

    window.addEventListener(wheelEvent, (e) => {
      e.preventDefault();
    }, wheelOpt); // modern desktop
    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, wheelOpt); // mobile
    window.addEventListener('keydown', (e) => {
      // console.log({e});
      // if(e.key==' '||e.key=='Enter'){
      //   this.hideshootingstars=!this.hideshootingstars
      // }
      if (e.ctrlKey && (e.key == '=' || e.key == '-' || e.key == '_' || e.key == '+')) {
        e.preventDefault();
        return false;
      }
    }, false);
  }

  constructor() { }

  ngOnInit(): void {
    this.disableScroll()
    // this.attachedString = "kavya ❤"
  }

}
