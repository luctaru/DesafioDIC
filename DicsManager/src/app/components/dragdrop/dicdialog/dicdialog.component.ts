import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DicsService } from 'src/app/services/connection/dics.service';
import { Users } from 'src/app/interfaces/users';
import { OperationdialogComponent } from '../../operationdialog/operationdialog.component';

@Component({
  selector: 'app-dicdialog',
  templateUrl: './dicdialog.component.html',
  styleUrls: ['./dicdialog.component.css']
})
export class DicdialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  temp: Users;

  constructor(
    private service: DicsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DicdialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      description: ['', Validators.required],
      id: [null],
      user: [null],
      status: [null],
      period: [null],
      startDate: [null],
      finishedDate: [null],
      isLate: [null]
    });

    this.firstFormGroup.patchValue(this.data.body);
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
