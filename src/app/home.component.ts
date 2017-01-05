import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
 
@Component({
    selector: 'home-component',
    templateUrl: "app/home.component.html" 
})
export class HomeComponent {
    
    constructor(private oAuthService: OAuthService) {
    }
    
    public login() {
        this.oAuthService.initImplicitFlow();
    }
    
    public logoff() {
        this.oAuthService.logOut();
    }
    
    public get name() {
        let claims = this.oAuthService.getIdentityClaims();
        if (!claims) return null;
        return claims.given_name; 
    }
    
}