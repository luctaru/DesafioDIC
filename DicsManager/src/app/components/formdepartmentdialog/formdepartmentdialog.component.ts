import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departments } from 'src/app/interfaces/departments';
import { DepartmentsService } from 'src/app/services/connection/departments.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { OperationdialogComponent } from '../operationdialog/operationdialog.component';

@Component({
  selector: 'app-formdepartmentdialog',
  templateUrl: './formdepartmentdialog.component.html',
  styleUrls: ['./formdepartmentdialog.component.css']
})
export class FormdepartmentdialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  temp: Departments;
  departmentArray: Array<Departments>;

  constructor(
    private departmentService: DepartmentsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormdepartmentdialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });

    if (this.data.operation === 'edit') {
      console.log(this.data.body);
      this.firstFormGroup.patchValue(this.data.body);
    }
  }

  save() {
    if (this.firstFormGroup.valid ) {
      this.temp = {
        ...this.firstFormGroup.value,
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
