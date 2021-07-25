import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';;
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './@components/home/home.component';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    NgAudioRecorderModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
