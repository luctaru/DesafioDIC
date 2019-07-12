import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { DicsService } from 'src/app/services/connection/dics.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { AuthService } from 'src/app/authorization/auth.service';
import { DicdialogService } from 'src/app/services/dialog/dicdialog.service';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css'],
})
export class DragdropComponent implements OnInit, OnDestroy {

  todefine: Array<any> = [];
  defined: Array<any> = [];
  concluded: Array<any> = [];

  todefineComplete: Array<any> = [];
  definedComplete: Array<any> = [];
  concludedComplete: Array<any> = [];

  period: Array<any> = [];
  year: Array<any> = [
    2019,
    2018,
    2017,
    2016,
    2015
  ];
  bimonthlyArray: Array<any> = [
    'First Bimester',
    'Second Bimester',
    'Third Bimester',
    'Fourth Bimester',
    'Fifth Bimester',
    'Sixth Bimester'
  ];

  monthlyArray: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  monthsArray: Array<any> = [];

  labelYear: any;
  labelPeriodType: any;
  labelPeriod: any;
  droppedData: any;

  subscription: Subscription;

  constructor(
    private dicService: DicsService,
    private periodService: PeriodsService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private dicDialogService: DicdialogService,
    private authService: AuthService
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

  render() {

    this.dicService.getAllByStatus('Definindo').subscribe(e => {
      this.todefine = [];
      e.map(item => {
        this.todefine.push(item);
      });
      this.todefineComplete = this.todefine;
    });

    this.dicService.getAllByStatus('Definido').subscribe(e => {
      this.defined = [];
      e.map(item => {
        this.defined.push(item);
      });
      this.definedComplete = this.defined;
    });

    this.dicService.getAllByStatus('Concluído').subscribe(e => {
      this.concluded = [];
      e.map(item => {
        this.concluded.push(item);
      });
      this.concludedComplete = this.concluded;
    });

    this.periodService.getAllPeriods().subscribe(e => {
      this.period = [];
      e.map(item => {
        this.period.push(item);
      });
    });

  }

  listen() {
    this.subscription = this.dicDialogService.emitt.subscribe(() => {
      this.render();
    });
    this.subscription = this.dicService.emitt.subscribe();
    this.labelYear = 'All';
    this.labelPeriod = 'No period';
  }

  add() {
    this.dicDialogService.addDialog(this.dialog);
  }

  filterYear(e) {
    this.labelYear = e;
    if (this.labelYear !== 'All') {

      this.todefine = this.todefineComplete.filter(d => (new Date(d.startDate).getFullYear() === this.labelYear));
      this.defined = this.definedComplete.filter(d => (new Date(d.startDate).getFullYear() === this.labelYear));
      this.concluded = this.concludedComplete.filter(d => (new Date(d.startDate).getFullYear() === this.labelYear));
    } else {
      this.labelPeriod = 'No period';
      this.render();
    }
  }

  filterPeriodType(e) {
    this.labelPeriodType = e;
    // this.monthsArray = [];
    // this.period.forEach(item => {
    //   if (item.name === e) {
    //     const aux = 12 / item.months;
    //     for (let index = 1; index <= aux; index++) {
    //       const element = index + 'º/' + this.labelYear;
    //       const obj = {
    //         data: element,
    //         months: item.months,
    //         period: index
    //       };
    //       this.monthsArray.push(obj);
    //     }
    //   }
    // });
  }

  filterPeriod(e) {
    this.labelPeriod = e;
    console.log(this.labelPeriod);
    if (this.labelPeriod !== 'No period') {
      if (this.labelPeriodType.months === 2) {
        switch (this.labelPeriod) {
          case 'First Bimester':
            this.filterBimester(0, 2, this.labelYear);
            break;
          case 'Second Bimester':
            this.filterBimester(2, 4, this.labelYear);
            break;
          case 'Third Bimester':
            this.filterBimester(4, 6, this.labelYear);
            break;
          case 'Fourth Bimester':
            this.filterBimester(6, 8, this.labelYear);
            break;
          case 'Fifth Bimester':
            this.filterBimester(8, 10, this.labelYear);
            break;
          case 'Sixth Bimester':
            this.filterBimester(10, 12, this.labelYear);
            break;
        }
      } else if (this.labelPeriodType.months === 1) {
        switch (this.labelPeriod) {
          case 'January':
            this.filterMonth(0, this.labelYear);
            break;
          case 'February':
            this.filterMonth(1, this.labelYear);
            break;
          case 'March':
            this.filterMonth(2, this.labelYear);
            break;
          case 'April':
            this.filterMonth(3, this.labelYear);
            break;
          case 'May':
            this.filterMonth(4, this.labelYear);
            break;
          case 'June':
            this.filterMonth(5, this.labelYear);
            break;
          case 'July':
            this.filterMonth(6, this.labelYear);
            break;
          case 'August':
            this.filterMonth(7, this.labelYear);
            break;
          case 'September':
            this.filterMonth(8, this.labelYear);
            break;
          case 'October':
            this.filterMonth(9, this.labelYear);
            break;
          case 'November':
            this.filterMonth(10, this.labelYear);
            break;
          case 'December':
            this.filterMonth(11, this.labelYear);
            break;
        }
      }
    }
  }

  filterBimester(i, e, y) {

    this.todefine = this.todefineComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e && new Date(d.startDate).getFullYear() === y)
    );
    this.defined = this.definedComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e && new Date(d.startDate).getFullYear() === y)
    );
    this.concluded = this.concludedComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e && new Date(d.startDate).getFullYear() === y)
    );
  }

  filterMonth(i, y) {
    this.todefine = this.todefineComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() === i && new Date(d.startDate).getFullYear() === y)
    );
    this.defined = this.definedComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() === i && new Date(d.startDate).getFullYear() === y)
    );
    this.concluded = this.concludedComplete.filter(d =>
      (new Date(d.startDate).getUTCMonth() === i && new Date(d.startDate).getFullYear() === y)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.dicDialogService.moveStatus(this.dialog, this.droppedData);
    }
  }

  dropped(e) {
    this.droppedData = e;
  }

  noReturnPredicate() {
    return false;
  }

  evenPredicate(item: CdkDrag<string>) {
    if (item.data === 'de') {
      return true;
    } else {
      return false;
    }
  }
  otherPredicate(item: CdkDrag<string>) {
    if (item.data === 'to') {
      return true;
    } else {
      return false;
    }
  }

}
