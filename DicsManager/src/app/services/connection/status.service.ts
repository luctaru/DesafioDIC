import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Status } from 'src/app/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getAllStatus() {
    return this.http.get<Status[]>(`${this.API}/Status`);
  }
}
