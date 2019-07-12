import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { Departments } from 'src/app/interfaces/departments';
import { Processes } from 'src/app/interfaces/processes';
import { ProcessesService } from 'src/app/services/connection/processes.service';
import { DepartmentsService } from 'src/app/services/connection/departments.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currUser = JSON.parse(localStorage.getItem('currentUser'));

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  temp: Users;
  departmentArray: Array<Departments>;
  processArray: Array<Processes>;

  constructor(
    private authService: AuthService,
    private processService: ProcessesService,
    private departmentService: DepartmentsService,
    private formBuilder: FormBuilder,
  ) {
    this.authService.showMenu.emit(true);
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: [null],
      department: ['', Validators.required],
      process: ['', Validators.required],
      isLeaderDepartment: ['', Validators.required],
      isLeaderProcess: ['', Validators.required],
      isAdmin: ['', Validators.required],
      password: ['teste123']
    });

    this.departmentService.getAll().subscribe(data => {
      this.departmentArray = [];
      this.departmentArray = data;
    });

    this.processService.getAll().subscribe(data => {
      this.processArray = [];
      this.processArray = data;
    });

    this.firstFormGroup.setValue({
      name: this.currUser.name,
      email: this.currUser.email,
      avatar: this.currUser.avatar,
      department: this.currUser.department.id,
      process: this.currUser.process.id,
      isLeaderDepartment: this.currUser.isLeaderDepartment,
      isLeaderProcess: this.currUser.isLeaderProcess,
      isAdmin: this.currUser.isAdmin,
      password: 'teste123'
    });
  }

}
