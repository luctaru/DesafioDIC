import { Injectable, EventEmitter } from '@angular/core';
import { DicsService } from '../connection/dics.service';
import { DicdialogComponent } from 'src/app/components/dragdrop/dicdialog/dicdialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';
import { AdddicdialogComponent } from 'src/app/components/dragdrop/adddicdialog/adddicdialog.component';
import { OperationdialogComponent } from 'src/app/components/operationdialog/operationdialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public emitt = new EventEmitter();

  constructor(
  ) { }

  operationDialog(dialog, op) {
    const dialogRef = dialog.open(OperationdialogComponent, {
      disableClose: false,
      data: {
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.emitt.emit();
    });
  }
}
