import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { NavBarComponent } from './nav-bar/navbar.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import {  OAuthService } from 'angular-oauth2-oidc';
import {AppState} from './appState';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule
  ],
  providers: [OAuthService, AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
