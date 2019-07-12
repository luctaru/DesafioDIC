import { Injectable, EventEmitter } from '@angular/core';
import { DicsService } from '../connection/dics.service';
import { AdddicdialogComponent } from 'src/app/components/dragdrop/adddicdialog/adddicdialog.component';
import { DicdialogComponent } from 'src/app/components/dragdrop/dicdialog/dicdialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class DicdialogService {

  public emitt = new EventEmitter();

  constructor(
    private dicsService: DicsService,
    private dialogService: DialogService
  ) { }

  addDialog(dialog) {
    const dialogRef = dialog.open(AdddicdialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        this.dicsService.insertDic(result.data).subscribe(() => {
          this.emitt.emit();
        });
        this.dialogService.operationDialog(dialog, true);
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }

  editDialog(dialog, obj) {
    const dialogRef = dialog.open(DicdialogComponent, {
      disableClose: true,
      data: {
        body: obj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        if (result.data.id !== null) {

          this.dicsService.updateDic(result.data).subscribe(() => {
            this.emitt.emit();
          });
          this.dialogService.operationDialog(dialog, true);
        }
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }

  moveStatus(dialog, obj) {
    const dialogRef = dialog.open(ConfirmdialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (obj.status.id === 1) {
          obj.status.id = 2;
        } else if (obj.status.id === 2) {
          obj.status.id = 3;
        }
        this.dicsService.updateDic(obj).subscribe(() => {
          this.emitt.emit();
        });
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }
}
