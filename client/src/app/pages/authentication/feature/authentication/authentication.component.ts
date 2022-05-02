import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../data-access/authentication.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {}

  public onLogIn() {
    const login = this.loginForm.get('identifier')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.setRedirectUrl('/dashboard');
    this.authService.login(login, password);
  }

}
