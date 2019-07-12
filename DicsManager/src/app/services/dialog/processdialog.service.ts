import { Injectable, EventEmitter } from '@angular/core';
import { ProcessesService } from '../connection/processes.service';
import { DialogService } from './dialog.service';
import { FormprocessdialogComponent } from 'src/app/components/formprocessdialog/formprocessdialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProcessdialogService {

  public emitt = new EventEmitter();

  constructor(
    private processService: ProcessesService,
    private dialogService: DialogService
  ) { }

  editProcessDialog(dialog, op, model) {
    const dialogRef = dialog.open(FormprocessdialogComponent, {
      disableClose: true,
      data: {
        body: model,
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        if (op === 'edit') {
          this.processService.updateProcess(result.data).subscribe(() => {
           this.emitt.emit();
          });
        } else {
          this.processService.insertProcess(result.data).subscribe(() => {
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
        this.processService.deleteProcess(obj).subscribe(() => {
          this.emitt.emit();
        });
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }
}
