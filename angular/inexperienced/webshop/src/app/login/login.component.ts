import { Component, OnInit } from "@angular/core";
import RegisterService from "../config/register.service";
import RegisterInterface from "src/types/RegisterInterface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import LoginInterface from "src/types/LoginInterface";
import LoginService from "../config/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return alert("Invalid form!");
    }

    this.loginService.login(this.loginForm.value).subscribe((response) => {
      if (response.status_code === 400) {
        this.loginService.user.next(null)
        return alert(response.detail)
      }

      this.loginService.user.next({
        username: this.loginForm.value.username,
        token: response.access_token as string,
      })

      this.router.navigate(["/"]);
      alert("You have successfully logged in!");
    });
  }
}
