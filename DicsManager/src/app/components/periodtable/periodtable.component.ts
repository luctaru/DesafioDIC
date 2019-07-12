import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Periods } from 'src/app/interfaces/periods';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authorization/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { PerioddialogService } from 'src/app/services/dialog/perioddialog.service';

@Component({
  selector: 'app-periodtable',
  templateUrl: './periodtable.component.html',
  styleUrls: ['./periodtable.component.css']
})
export class PeriodtableComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Periods>;
  selection = new SelectionModel<Periods>(true, []);
  array: Array<number> = [];
  subscription: Subscription;

  displayedColumns = ['name', 'months', 'edit', 'delete'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private periodDialogService: PerioddialogService,
    private dialogService: DialogService,
    private periodService: PeriodsService
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
    this.subscription = this.periodDialogService.emitt.subscribe(() => {
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
    this.periodService.getAllPeriods().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  edit(e) {
    this.periodDialogService.addDialog(this.dialog, 'edit', e);
  }

  add() {
    const body = null;
    this.periodDialogService.addDialog(this.dialog, 'add', body);
  }

  delete(e) {
    this.periodDialogService.deleteDialog(this.dialog, e);
  }
}
