import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentsService } from 'src/app/services/connection/departments.service';
import { Processes } from 'src/app/interfaces/processes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departments } from 'src/app/interfaces/departments';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { OperationdialogComponent } from '../operationdialog/operationdialog.component';

@Component({
  selector: 'app-formprocessdialog',
  templateUrl: './formprocessdialog.component.html',
  styleUrls: ['./formprocessdialog.component.css']
})
export class FormprocessdialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  temp: Processes;
  departmentArray: Array<Departments>;

  constructor(
    private departmentService: DepartmentsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormprocessdialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.departmentService.getAll().subscribe(data => {
      this.departmentArray = [];
      this.departmentArray = data;
    });

    if (this.data.operation === 'edit') {
      console.log(this.data.body);
      this.firstFormGroup.patchValue(this.data.body);
      this.firstFormGroup.setValue({
        name: this.data.body.name,
        department: this.data.body.department.id
      });
    }
  }

  save() {
    if (this.firstFormGroup.valid) {
      this.temp = {
        ...this.firstFormGroup.value
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
