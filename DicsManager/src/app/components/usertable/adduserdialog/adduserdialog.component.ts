import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { Departments } from 'src/app/interfaces/departments';
import { Processes } from 'src/app/interfaces/processes';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentsService } from 'src/app/services/connection/departments.service';
import { ProcessesService } from 'src/app/services/connection/processes.service';
import { OperationdialogComponent } from '../../operationdialog/operationdialog.component';

@Component({
  selector: 'app-adduserdialog',
  templateUrl: './adduserdialog.component.html',
  styleUrls: ['./adduserdialog.component.css']
})
export class AdduserdialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  temp: Users;
  departmentArray: Array<Departments>;
  processArray: Array<Processes>;

  constructor(
    private processService: ProcessesService,
    private departmentService: DepartmentsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AdduserdialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: [null]
    });

    this.secondFormGroup = this.formBuilder.group({
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

    if (this.data.operation === 'edit') {
      console.log(this.data.body);
      this.firstFormGroup.patchValue(this.data.body);
      this.secondFormGroup.patchValue(this.data.body);
      this.secondFormGroup.setValue({
        department: this.data.body.department.id,
        process: this.data.body.process.id,
        isLeaderDepartment: this.data.body.isLeaderDepartment,
        isLeaderProcess: this.data.body.isLeaderProcess,
        isAdmin: this.data.body.isAdmin,
        password: 'teste123'
      });
    }
  }

  save() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.temp = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };
      this.dialogRef.close({ data: this.temp, closed: true });
    } else {
      const dialogRef = this.dialog.open(OperationdialogComponent, {
        disableClose: false,
        data: {
          operation: 'invalid'
        }
      });
    }
  }

}
