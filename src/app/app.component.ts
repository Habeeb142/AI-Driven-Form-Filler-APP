import { Component, Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({providedIn: 'root'})
export class AppComponent {
  title = 'Tunga';

  private previousUrl: string;
  private currentUrl: string;

  
  constructor(
    private rout: Router
    ) { 
      this.currentUrl = this.rout.url;
      this.previousUrl = null;
      this.rout.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(this.previousUrl)
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.urlAfterRedirects;
      });
    }

  ngOnInit(): void {
    // Set backbutton routing
    this.previousUrl = localStorage.getItem('__ROUT__');
    this.previousUrl ? this.isBackButton() : null;
    
    document.addEventListener('backbutton', (e)=>{
        e.preventDefault();
        setTimeout(() => {
          localStorage.setItem('__ROUT__', this.previousUrl.substring(1))
          this.currentUrl == '/'? (navigator as any).app.exitApp() : location.href = 'index.html';
        }, 500);
    }, false)

  }
  // check isBackbutton pressed
  isBackButton() {
    localStorage.clear()
    this.rout.navigate([this.previousUrl]);
  }
}
