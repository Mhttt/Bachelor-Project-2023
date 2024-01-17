import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import LoginService from '../config/login.service';
import HistoryService from '../config/history.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css'],
})
export class HistoryInfoComponent implements OnInit {


  constructor(
    private historyService: HistoryService,
    private router: ActivatedRoute,
    private _router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this._router.navigate(['/login'])
      return
    }

    this.router.paramMap.subscribe((params) => {
      const id = params.get('id') as string;

      this.historyService.getHistoryItem(id, this.loginService.user.value!.token).subscribe(res => {
        console.log(res)
      });
    })
  }
}
