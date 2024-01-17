import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export default class RegisterService {
    
  constructor(private http: HttpClient) { }

  register(form: {username: string, email: string, password: string}) {
    return this.http.post<any>("http://143.42.222.62:8000/register", form)
  }

}