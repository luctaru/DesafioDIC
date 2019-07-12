import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-operationdialog',
  templateUrl: './operationdialog.component.html',
  styleUrls: ['./operationdialog.component.css']
})
export class OperationdialogComponent implements OnInit {

  operation: any;

  constructor(
    private dialogRef: MatDialogRef<OperationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data !== null) {
      this.operation = this.data.operation;
    }
  }

  exit() {
    this.dialogRef.close();
  }

}
