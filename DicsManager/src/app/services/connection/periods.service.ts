import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Periods } from 'src/app/interfaces/periods';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getAllPeriods() {
    return this.http.get<Periods[]>(`${this.API}/periods`);
  }

  updatePeriod(model) {
    console.log(model);

    const Id = model.id;
    const Name = model.name;
    const Months = model.months;

    return this.http.put(`${this.API}/Periods`, {
      Id,
      Name,
      Months
    }).pipe(take(1));
  }

  insertPeriod(model) {
    console.log(model);

    const Name = model.name;
    const Months = model.months;

    return this.http.post(`${this.API}/Periods`, {
      Name,
      Months
    }).pipe(take(1));
  }

  deletePeriod(model) {
    return this.http.delete(`${this.API}/Periods/${model.id}`);
  }
}
