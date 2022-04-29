import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  toggleMobile: boolean = false;

  myButton: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.myButton = document.getElementById("btn-back-to-top");
      window.addEventListener('scroll', this.scroll, true);
   }
  }

  onNavbarToggle(): void {
    this.toggleMobile = !this.toggleMobile;
  }

  scroll = (event: any): void => {
    if (isPlatformBrowser(this.platformId)) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.myButton.style.display = "block";
      } else {
        this.myButton.style.display = "none";
      }
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scroll, true);
    }
  }

}
