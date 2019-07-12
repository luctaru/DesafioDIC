import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departments } from 'src/app/interfaces/departments';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private readonly API = `${environment.API}`;

  public emitt = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Departments[]>(`${this.API}/Departments`);
  }

  updateDepartment(model) {
    console.log(model);

    const Id = model.id;
    const Name = model.name;

    return this.http.put(`${this.API}/Departments`, {
      Id,
      Name
    }).pipe(take(1));
  }

  insertDepartment(model) {
    console.log(model);

    const Name = model.name;

    return this.http.post(`${this.API}/Departments`, {
      Name
    }).pipe(take(1));
  }

  deleteDepartment(model) {
    return this.http.delete(`${this.API}/Departments/${model.id}`);
  }
}
