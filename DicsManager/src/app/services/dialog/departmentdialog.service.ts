import { Injectable, EventEmitter } from '@angular/core';
import { DepartmentsService } from '../connection/departments.service';
import { DialogService } from './dialog.service';
import { FormdepartmentdialogComponent } from 'src/app/components/formdepartmentdialog/formdepartmentdialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class DepartmentdialogService {

  public emitt = new EventEmitter();

  constructor(
    private departmentService: DepartmentsService,
    private dialogService: DialogService
  ) { }

  editDialog(dialog, op, model) {
    const dialogRef = dialog.open(FormdepartmentdialogComponent, {
      disableClose: true,
      data: {
        body: model,
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        if (op === 'edit') {
          this.departmentService.updateDepartment(result.data).subscribe(() => {
            this.emitt.emit();
          });
        } else {
          this.departmentService.insertDepartment(result.data).subscribe(() => {
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
        this.departmentService.deleteDepartment(obj).subscribe(() => {
          this.emitt.emit();
        });
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }
}
