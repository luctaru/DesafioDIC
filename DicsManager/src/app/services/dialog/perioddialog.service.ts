import { Injectable, EventEmitter } from '@angular/core';
import { PeriodsService } from '../connection/periods.service';
import { DialogService } from './dialog.service';
import { FormperioddialogComponent } from 'src/app/components/periodtable/formperioddialog/formperioddialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class PerioddialogService {

  public emitt = new EventEmitter();

  constructor(
    private periodService: PeriodsService,
    private dialogService: DialogService
  ) { }

  addDialog(dialog, op, model) {
    const dialogRef = dialog.open(FormperioddialogComponent, {
      disableClose: true,
      data: {
        body: model,
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        if (op === 'add') {
          this.periodService.insertPeriod(result.data).subscribe(() => {
            this.emitt.emit();
          });
        } else {
          this.periodService.updatePeriod(result.data).subscribe(() => {
            this.emitt.emit();
          });
        }
        this.dialogService.operationDialog(dialog, true);
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }

  deleteDialog(dialog, obj) {
    const dialogRef = dialog.open(ConfirmdialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.periodService.deletePeriod(obj).subscribe(() => {
          this.emitt.emit();
        });
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }
}
