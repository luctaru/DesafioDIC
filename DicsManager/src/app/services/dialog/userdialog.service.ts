import { Injectable, EventEmitter } from '@angular/core';
import { UsersService } from '../connection/users.service';
import { DialogService } from './dialog.service';
import { AdduserdialogComponent } from 'src/app/components/usertable/adduserdialog/adduserdialog.component';
import { ConfirmdialogComponent } from 'src/app/components/confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserdialogService {

  public emitt = new EventEmitter();

  constructor(
    private userService: UsersService,
    private dialogService: DialogService
  ) { }

  addDialog(dialog, op, model) {
    const dialogRef = dialog.open(AdduserdialogComponent, {
      disableClose: true,
      data: {
        body: model,
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.closed) {
        if (op === 'add') {
          this.userService.insertUser(result.data).subscribe(() => {
            this.emitt.emit();
          });
        } else {
          this.userService.updateUser(result.data).subscribe(() => {
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
        this.userService.deleteUser(obj).subscribe(() => {
          this.emitt.emit();
        });
      } else {
        this.dialogService.operationDialog(dialog, false);
      }
      this.emitt.emit();
    });
  }
}
