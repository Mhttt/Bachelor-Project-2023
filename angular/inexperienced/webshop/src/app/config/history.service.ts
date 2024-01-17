import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { History } from 'src/types/History';

@Injectable()
export default class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(token: string) {
    return this.http.get<History[]>(`http://143.42.222.62:8000/purchases`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getHistoryItem(id: string, token: string) {
    return this.http.get(`http://143.42.222.62:8000/purchases/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

