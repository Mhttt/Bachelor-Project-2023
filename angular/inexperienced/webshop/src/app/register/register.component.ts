import { Component, OnInit } from "@angular/core";
import RegisterService from "../config/register.service";
import RegisterInterface from "src/types/RegisterInterface";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private registerService: RegisterService) { }

  passwordRepeatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (Validators.minLength(8)(control) !== null) {
        return { minlength: true };
      }

      if (control.value !== this.registerForm?.value.password) {
        return { notEqual: true };
      }

      return null;
    };
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl("", Validators.email),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_repeat: new FormControl("", Validators.compose([
        Validators.required,
        this.passwordRepeatValidator(),
      ])),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return alert("Invalid form!");
    }

    const {
      username,
      email,
      password,
      password_repeat,
    } = this.registerForm.value;

    if (password_repeat !== password) {
      return alert("The passwords does not match!");

    }

    const form: RegisterInterface = {
      username,
      email,
      password,
    };

    this.registerService.register(form).subscribe((response) => {
      if (response.status_code === 400) {
        return alert(response.detail)
      }

      alert("You have successfully been registered!");
    });
  }
}
