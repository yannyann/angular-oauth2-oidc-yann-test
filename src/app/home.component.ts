import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppState } from './appState';
 
@Component({
    selector: 'home-component',
    templateUrl: "app/home.component.html" 
})
export class HomeComponent {

    public username: string;
    public password: string;
    public token: string;
    public implicitFlow: boolean;

    constructor(private oauthService: OAuthService, public appState: AppState) {
         console.log(appState);
        console.log(appState.implicitFlow);
        this.implicitFlow = appState.implicitFlow;
    }
    

    public loginWithPassword() {
        console.log("password flow");
        console.log(this.username);
        console.log(this.password);
        this.oauthService.fetchTokenUsingPasswordFlow(this.username, this.password).then(
            result => {
                this.token = this.oauthService.getAccessToken();
            },
            error => {
                console.log(error);
                this.token = error;
            })
    }
    public login() {
        console.log("impl flow");
        this.oauthService.initImplicitFlow();
    }
    
    public logoff() {
        this.oauthService.logOut();
    }
    
    public get name() {
        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims.given_name; 
    }

    public switchFlow(){
        console.log("change flow "+this.appState.implicitFlow);
        if(this.appState.implicitFlow){
            this.appState.configureWithPasswordFlow();
            this.implicitFlow = this.appState.implicitFlow;
        }else{
            this.appState.configureImplFlow();
            this.implicitFlow = this.appState.implicitFlow;
        }
    }
    
}