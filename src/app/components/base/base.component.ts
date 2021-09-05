import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MusicControllerService } from 'src/app/services/music-controller.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})


export class BaseComponent implements OnInit {

  user!: string
  realMoon: boolean = false;
  actionpanel: boolean = false;
  darksky: boolean = false;
  rotatesky: boolean = true;
  attachedString: string = '';
  starCountArray = new Array(25)


  constructor(public musicController: MusicControllerService, private activated_route: ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
 
    try {
      this.user = decodeURIComponent(escape(window.atob(this.activated_route.snapshot.paramMap.get("code"))));
      // alert('Hello ' + this.user + ' 😀')
      
    } catch (error) {
      console.log('could not resolove user')
      this.router.navigate(['../getuser'],{relativeTo:this.activated_route})
      return
    }

    this.showActionPanel()
    this.disableScroll()
  }

  togglefullscreen() {
    let elem = document.documentElement;
    if (!this.isFullScreen) {
      elem.requestFullscreen({ navigationUI: "show" }).then(() => { }).catch(err => {
        alert(`An error occurred while trying to switch into full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().then(() => { });
    }
  }

  get isFullScreen(): boolean {
    return ((window.innerWidth == screen.width && window.innerHeight == screen.height))
  }

  showActionPanel() {

    if (!this.actionpanel) {
      this.actionpanel = true
      document.body.style.cursor = 'default';
      setTimeout(() => {
        this.actionpanel = false
        document.body.style.cursor = 'none';
      }, 8000);
    }
  }

  register(){
    this.router.navigate(['../getuser'],{relativeTo:this.activated_route})
  }

  surprise(): boolean {
    if (this.attachedString.length >= 1) {

      this.attachedString = ""
      return false
    }
    else {
      this.attachedString = this.user ?? '❤ ';
      return true
      // this.attachedString = "K♥VYA"
    }
  }


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
      // console.log({ e });

      if (e.key == 'q' || e.key == "Q") {
        this.surprise()
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
}
