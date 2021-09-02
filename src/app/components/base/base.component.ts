import { Component, OnInit } from '@angular/core';
import { MusicControllerService } from 'src/app/services/music-controller.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  realMoon:boolean=true;
  showhint: boolean = false;
  darksky: boolean = false;
  rotatesky: boolean = true;
  attachedString: string = '';
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
      console.log({ e });

      if (e.key == 'q' || e.key == "Q") {
        if (this.attachedString.length >= 1) {

          this.attachedString = ""
        }
        else {
          this.attachedString = "♥"
          // this.attachedString = "K♥VYA"
        }
      }

      if (e.key == ' ' || e.key == 'Enter') {
        console.log('playing song')
        this.musicController.toggle_sound()
        // this.musicController.toggle_sound()
      }
      if (e.ctrlKey && (e.key == '=' || e.key == '-' || e.key == '_' || e.key == '+')) {
        e.preventDefault();
        return false;
      }
    }, false);
  }

  constructor(public musicController: MusicControllerService) { }

  ngOnInit(): void {
    document.body.style.cursor = 'none';
    this.showHint()
    // this.musicController.play_bgm()
    this.disableScroll()
    // this.attachedString = "Hi there ❤"
  }

  showHint() {
    if (!this.showhint) {
      this.showhint = true
      setTimeout(() => {
        this.showhint = false
      }, 8000);
    }
  }

}
