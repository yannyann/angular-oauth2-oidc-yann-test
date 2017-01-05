import { Component } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private _notificationService: NotificationsService , private oauthService: OAuthService ){
        // Login-Url
        //this.oauthService.loginUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/authorize"; //Id-Provider?
        // Url with user info endpoint
        // This endpont is described by OIDC and provides data about the loggin user
        // This sample uses it, because we don't get an id_token when we use the password flow
        // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
        this.oauthService.userinfoEndpoint = "https://steyer-identity-server.azurewebsites.net/identity/connect/userinfo";

        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = "demo-resource-owner";

        // set the scope for the permissions the client should request
        // The auth-server used here only returns a refresh token (see below), when the scope offline_access is requested
        this.oauthService.scope = "openid profile email voucher offline_access";

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        // Set a dummy secret
        // Please note that the auth-server used here demand the client to transmit a client secret, although
        // the standard explicitly cites that the password flow can also be used without it. Using a client secret
        // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
        // Using such a dummy secreat is as safe as using no secret.
        this.oauthService.dummyClientSecret = "geheim";

        // Load Discovery Document and then try to login the user
        let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';
        this.oauthService.loadDiscoveryDocument(url).then(() => {
            // Do what ever you want here
        });
  }

}
