import { Component } from '@angular/core';


import { NotificationsService } from 'angular2-notifications';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppState } from './appState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private _notificationService: NotificationsService, private oauthService : OAuthService, private appState: AppState){   
    //choose one of the both configurations otherwise it override the other.
    //this.configureImplFlow();
    this.appState.configureWithPasswordFlow();
  }

  public onSubmit(){
    this._notificationService.create('test','test','info');
  }
}
