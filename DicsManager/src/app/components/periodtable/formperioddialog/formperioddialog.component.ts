import { Component, OnInit, Inject } from '@angular/core';
import { Periods } from 'src/app/interfaces/periods';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { OperationdialogComponent } from '../../operationdialog/operationdialog.component';

@Component({
  selector: 'app-formperioddialog',
  templateUrl: './formperioddialog.component.html',
  styleUrls: ['./formperioddialog.component.css']
})
export class FormperioddialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  temp: Periods;

  constructor(
    private periodService: PeriodsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormperioddialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      months: ['', Validators.required]
    });

    if (this.data.operation === 'edit') {
      console.log(this.data.body);
      this.firstFormGroup.patchValue(this.data.body);
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
