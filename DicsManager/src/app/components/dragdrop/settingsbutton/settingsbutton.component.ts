import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { DicdialogService } from 'src/app/services/dialog/dicdialog.service';
import { Dics } from 'src/app/interfaces/dics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settingsbutton',
  templateUrl: './settingsbutton.component.html',
  styleUrls: ['./settingsbutton.component.css']
})
export class SettingsbuttonComponent implements OnInit {

  @Input() obj: Dics;

  constructor(
    private dialog: MatDialog,
    private dicDialogService: DicdialogService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeStatus() {
    this.dicDialogService.moveStatus(this.dialog, this.obj);
  }

  edit() {
    this.dicDialogService.editDialog(this.dialog, this.obj);
  }

  redirect() {
    this.router.navigate([`/details`, { id: this.obj.user.id, idDic: this.obj.id }]);
  }
}
