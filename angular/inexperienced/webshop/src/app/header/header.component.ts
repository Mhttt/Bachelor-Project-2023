import { Component, Input } from '@angular/core';
import { FreeShippingComponent } from '../free-shipping/free-shipping.component';
import LoginService from '../config/login.service';
import UserInterface from 'src/types/UserInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  user: UserInterface | null;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.user.subscribe(next => this.user = next);
  }
}
