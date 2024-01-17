import { Component, OnInit } from "@angular/core";
import RegisterService from "../config/register.service";
import RegisterInterface from "src/types/RegisterInterface";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import HistoryService from "../config/history.service";
import LoginService from "../config/login.service";
import { History } from "src/types/History";
import { Router } from "@angular/router";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  items: History | undefined = undefined;
  date: Date | undefined = undefined;
  total: number | undefined;

  constructor(private historyService: HistoryService, private loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this._router.navigate(['/login'])
      return;
    }

    this.historyService.getHistory(this.loginService.user.value!.token).subscribe((history) => {
      const items = history[0]
      this.items = items;
      this.date = new Date(items.purchase_date);
      this.total = items.items.reduce((acc, item) => acc + item.price, 0);
    })
  }
}
