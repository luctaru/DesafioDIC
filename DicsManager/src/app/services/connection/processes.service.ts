import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Processes } from 'src/app/interfaces/processes';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
  private readonly API = `${environment.API}`;

  public emitt = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Processes[]>(`${this.API}/Processes`);
  }

  updateProcess(model) {
    console.log(model);

    const Id = model.id;
    const Name = model.name;
    const IdDepartment = model.department.id;

    return this.http.put(`${this.API}/Processes`, {
      Id,
      Name,
      IdDepartment
    }).pipe(take(1));
  }

  insertProcess(model) {
    console.log(model);

    const Name = model.name;
    const IdDepartment = model.department.id;

    return this.http.post(`${this.API}/Processes`, {
      Name,
      IdDepartment
    }).pipe(take(1));
  }

  deleteProcess(model) {
    return this.http.delete(`${this.API}/Processes/${model.id}`);
  }
}
