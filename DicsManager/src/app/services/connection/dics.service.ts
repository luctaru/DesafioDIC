import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dics } from 'src/app/interfaces/dics';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DicsService {
  private readonly API = `${environment.API}`;

  public emitt = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Dics[]>(`${this.API}/DICs`);
  }

  getAllByUser(model) {
    return this.http.get<Dics[]>(`${this.API}/DICs?user=${model.name}`);
  }

  getAllByStatus(model) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Dics[]>(`${this.API}/DICs?status=${model}`);
  }

  getAllByDepartment(model) {
    return this.http.get<Dics[]>(`${this.API}/DICs?department=${model.name}`);
  }

  getAllByProcess(model) {
    return this.http.get<Dics[]>(`${this.API}/DICs?process=${model.name}`);
  }

  getAllByPeriod(model) {
    return this.http.get<Dics[]>(`${this.API}/DICs?period=${model.name}`);
  }

  getAllByLate(model) {
    return this.http.get<Dics[]>(`${this.API}/DICs?late=${model.isLate}`);
  }

  get(model) {
    return this.http.get<Dics>(`${this.API}/DICs/${model}`).pipe(take(1));
  }

  updateDic(model) {
    // let body = {
    //   id: model.id,
    //   // IdUser: model.user.id,
    //   idStatus: model.status.id,
    //   // IdPeriod: model.period.id,
    //   description: model.description
    // };
    console.log(model);
    const Id = model.id;
    const description = model.description;
    const IdUser = model.user.id;
    const IdStatus = model.status.id;
    const IdPeriod = model.period.id;
    const finishedDate = model.finishedDate;

    return this.http.put(`${this.API}/DICs/`, {
      Id,
      IdUser,
      IdStatus,
      IdPeriod,
      description
    }).pipe(take(1));
  }

  insertDic(model) {

    console.log(model);

    const description = model.description;
    const IdUser = model.user.id;
    const IdStatus = model.status;
    const IdPeriod = model.period;

    console.log({
      description,
      IdUser,
      IdStatus,
      IdPeriod
    });

    return this.http.post(`${this.API}/DICs`, {
      description,
      IdUser,
      IdStatus,
      IdPeriod
    }).pipe(take(1));
  }

  // filterYearService(todefine, defined, concluded, labelYear) {

  //   const aux1 = [];
  //   const aux2 = [];
  //   const aux3 = [];

  //   const arrays = {
  //     array1: aux1,
  //     array2: aux2,
  //     array3: aux3
  //   };

  //   const auxTodefine = todefine.filter(d => (new Date(d.startDate).getFullYear() === labelYear)).subscribe(e => {
  //     arrays.array1 = e;
  //     this.emitt.emit();
  //   });
  //   const auxDefined = defined.filter(d => (new Date(d.startDate).getFullYear() === labelYear)).subscribe(e => {
  //     arrays.array2 = e;
  //     this.emitt.emit();
  //   });
  //   const auxConcluded = concluded.filter(d => (new Date(d.startDate).getFullYear() === labelYear)).subscribe(e => {
  //     arrays.array3 = e;
  //     this.emitt.emit();
  //   });

  //   return arrays;
  // }
}
