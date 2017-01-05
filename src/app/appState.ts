import { Injectable } from '@angular/core';

import {  OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AppState {
  public implicitFlow : boolean;

  constructor(private oauthService : OAuthService){   
    //choose one of them configurations otherwise it override the other.
    //this.configureImplFlow();
    this.configureWithPasswordFlow();
  }

  public configureImplFlow(){
        this.implicitFlow=true;
        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin + "/index.html";

        // The SPA's id. The SPA is registerd with this id at the auth-server
        this.oauthService.clientId = "spa-demo";

        // set the scope for the permissions the client should request
        // The first three are defined by OIDC. The 4th is a usecase-specific one
        this.oauthService.scope = "openid profile email voucher";

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        // Discovery Document of your AuthServer as defined by OIDC 
        let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';

        // Load Discovery Document and then try to login the user
        this.oauthService.loadDiscoveryDocument(url).then(() => {

            // This method just tries to parse the token(s) within the url when
            // the auth-server redirects the user back to the web-app
            // It dosn't send the user the the login page
            this.oauthService.tryLogin({});      

        });  
    }

    public configureWithPasswordFlow(){
        this.implicitFlow=false;
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