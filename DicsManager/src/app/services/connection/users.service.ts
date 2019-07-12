import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/interfaces/users';
import { take } from 'rxjs/operators';
import { UserDic } from 'src/app/interfaces/UserDic';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<Users[]>(`${this.API}/Users`);
  }

  getUserDic(model) {
    return this.http.get<UserDic>(`${this.API}/Users/dics/${model}`);
  }

  insertUser(model) {

    console.log(model);

    const Name = model.name;
    const Email = model.email;
    const Avatar = model.avatar;
    const Department = model.department;
    const Process = model.process;
    const Password = model.password;
    const IsLeaderDepartment = model.isLeaderDepartment;
    const IsLeaderProcess = model.isLeaderProcess;
    const IsAdmin = model.IsAdmin;

    return this.http.post(`${this.API}/users`, {
      Name,
      Email,
      Avatar,
      Department,
      Process,
      Password,
      IsLeaderDepartment,
      IsLeaderProcess,
      IsAdmin
    }).pipe(take(1));
  }

  updateUser(model) {

    console.log(model);

    const Id = model.id;
    const Name = model.name;
    const Email = model.email;
    const Avatar = model.avatar;
    const Department = model.department;
    const Process = model.process;
    const Password = model.password;
    const IsLeaderDepartment = model.isLeaderDepartment;
    const IsLeaderProcess = model.isLeaderProcess;
    const IsAdmin = model.IsAdmin;

    return this.http.put(`${this.API}/users`, {
      Id,
      Name,
      Email,
      Avatar,
      Department,
      Process,
      Password,
      IsLeaderDepartment,
      IsLeaderProcess,
      IsAdmin
    }).pipe(take(1));
  }

  deleteUser(model) {
    return this.http.delete(`${this.API}/users/${model.id}`);
  }
}
