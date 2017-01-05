import { Component } from '@angular/core';

@Component({
  selector: 'navig-bar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavBarComponent {
  title = 'app works!';
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

}
