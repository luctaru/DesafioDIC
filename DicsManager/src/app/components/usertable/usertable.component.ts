import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDialog, MatTableDataSource } from '@angular/material';
import { UsertableDataSource, UsertableItem } from './usertable-datasource';
import { AuthService } from 'src/app/authorization/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Users } from 'src/app/interfaces/users';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/connection/users.service';
import { UserdialogService } from 'src/app/services/dialog/userdialog.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Users>;
  selection = new SelectionModel<Users>(true, []);
  array: Array<number> = [];
  subscription: Subscription;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'department', 'edit', 'delete'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private userDialogService: UserdialogService,
    private dialogService: DialogService
  ) {
    this.authService.showMenu.emit(true);
  }

  ngOnInit() {
    this.render();
    this.listen();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  listen() {
    this.subscription = this.userDialogService.emitt.subscribe(() => {
      this.render();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  render() {
    this.userService.getAllUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  redirect(e) {
    console.log(e);
    this.router.navigate([`/details`, { id: e.id, idDic: -1 }]);
  }

  add() {
    const body = null;
    this.userDialogService.addDialog(this.dialog, 'add', body);
  }

  edit(e) {
    this.userDialogService.addDialog(this.dialog, 'edit', e);
  }

  delete(e) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.id === e.id) {
      this.dialogService.operationDialog(this.dialog, 'currentUser');
    } else {
      this.userDialogService.deleteDialog(this.dialog, e);
    }
  }
}
