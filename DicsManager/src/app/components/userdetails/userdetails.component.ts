import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { Dics } from 'src/app/interfaces/dics';
import { AuthService } from 'src/app/authorization/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/connection/users.service';
import { DicsService } from 'src/app/services/connection/dics.service';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { MatDialog } from '@angular/material';
import { DicdialogService } from 'src/app/services/dialog/dicdialog.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  user: Users;
  mainDic: Dics;
  dicsArray: Array<Dics>;
  fixedArray: Array<Dics>;
  lateArray: Array<Dics>;
  concludedArray: Array<Dics>;
  notConcludedArray: Array<Dics>;

  chartData: any;
  columnData: any;
  chartOptions: any;
  columnOptions: any;
  chartColumnNames: any;
  width: any;
  height: any;

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

  labelYear: any;
  labelPeriodType: any;
  labelPeriod: any;

  chart = false;
  chartColumn = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private dicsService: DicsService,
    private periodService: PeriodsService,
    private router: Router,
    private dialog: MatDialog,
    private dicDialogService: DicdialogService
  ) {
    this.authService.showMenu.emit(true);
  }

  ngOnInit() {

    this.render();


    this.chartColumnNames = ['DICs'];
    this.chartOptions = {
      colors: ['#FB1C1C', '#5CFB1C', '#00B2CE'],
      is3D: true
    };

    this.columnOptions = {
      colors: ['#00B2CE'],
      is3D: true
    };

    this.periodService.getAllPeriods().subscribe(e => {
      this.period = [];
      e.map(item => {
        this.period.push(item);
      });
    });

    this.width = '500';
    this.height = '300';

    if (window.innerWidth <= 360) {
      this.width = '300';
      this.height = '200';
    }

  }

  render() {
    this.dicsArray = [];

    this.labelYear = 'Current';
    this.labelPeriod = 'No period';

    this.route.paramMap.subscribe(params => {
      this.userService.getUserDic(params.get('id')).subscribe(data => {
        this.dicsArray = data.dics;
        this.fixedArray = data.dics;
        this.user = data.user;
        // tslint:disable-next-line:radix
        this.initialDic(parseInt(params.get('idDic')));

        this.lateArray = this.dicsArray.filter(d => (d.isLate === 1));
        this.concludedArray = this.dicsArray.filter(d => (d.status.id === 3));
        this.notConcludedArray = this.dicsArray.filter(d => (d.status.id !== 3));
        this.chartData = [
          ['Late DICs', this.lateArray.length],
          ['Concluded in Time DICs', this.concludedArray.length],
          ['Not Concluded DICs', this.notConcludedArray.length],
        ];

        this.columnData = [
          ['2017', this.fixedArray.filter(d => (d.status.id === 3 && new Date(d.startDate).getFullYear() === 2017)).length],
          ['2018', this.fixedArray.filter(d => (d.status.id === 3 && new Date(d.startDate).getFullYear() === 2018)).length],
          ['2019', this.fixedArray.filter(d => (d.status.id === 3 && new Date(d.startDate).getFullYear() === 2019)).length]
        ];
        this.chart = true;
        this.chartColumn = true;
      });
    });
  }

  initialDic(id) {
    if (id === -1) {
      const dicAux = this.dicsArray.filter(d => (new Date(d.startDate) <= new Date()));
      this.mainDic = dicAux[dicAux.length - 1];
    } else {
      if (id !== undefined) {
        this.dicsService.get(id).subscribe(data => {
          if (data === null) {
            this.mainDic = null;
          } else {
            this.mainDic = data;
            console.log(this.mainDic);
          }
        });
      }
    }
  }

  filterYear(e) {
    this.labelYear = e;
    if (this.labelYear !== 'Current') {

      const dicAux = this.dicsArray.filter(d => (new Date(d.startDate).getFullYear() === this.labelYear));
      this.mainDic = dicAux[dicAux.length - 1];

      this.lateArray = dicAux.filter(d => (d.isLate === 1));
      this.concludedArray = dicAux.filter(d => (d.status.id === 3));
      this.notConcludedArray = dicAux.filter(d => (d.status.id !== 3));
      this.chartData = [
        ['Late DICs', this.lateArray.length],
        ['Concluded in Time DICs', this.concludedArray.length],
        ['Not Concluded DICs', this.notConcludedArray.length],
      ];

      if (this.chartData[0][1] === 0 && this.chartData[1][1] === 0 && this.chartData[2][1] === 0) {
        this.chart = false;
      } else {
        this.chart = true;
      }
    } else {
      this.labelPeriod = 'No period';
      this.render();
    }
  }

  filterPeriodType(e) {
    this.labelPeriodType = e;
  }

  filterPeriod(e) {
    this.labelPeriod = e;
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

    const dicAux = this.dicsArray.filter(d =>
      (new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e && new Date(d.startDate).getFullYear() === y));
    this.mainDic = dicAux[dicAux.length - 1];

    this.lateArray = dicAux.filter(d => (d.isLate === 1));
    this.concludedArray = dicAux.filter(d => (d.status.id === 3));
    this.notConcludedArray = dicAux.filter(d => (d.status.id !== 3));
    this.chartData = [
      ['Late DICs', this.lateArray.length],
      ['Concluded in Time DICs', this.concludedArray.length],
      ['Not Concluded DICs', this.notConcludedArray.length],
    ];

    if (this.chartData[0][1] === 0 && this.chartData[1][1] === 0 && this.chartData[2][1] === 0) {
      this.chart = false;
    } else {
      this.chart = true;
    }
  }

  filterMonth(i, y) {
    const dicAux = this.dicsArray.filter(d =>
      (new Date(d.startDate).getUTCMonth() === i && new Date(d.startDate).getFullYear() === y));
    this.mainDic = dicAux[dicAux.length - 1];

    this.lateArray = dicAux.filter(d => (d.isLate === 1));
    this.concludedArray = dicAux.filter(d => (d.status.id === 3));
    this.notConcludedArray = dicAux.filter(d => (d.status.id !== 3));
    this.chartData = [
      ['Late DICs', this.lateArray.length],
      ['Concluded in Time DICs', this.concludedArray.length],
      ['Not Concluded DICs', this.notConcludedArray.length],
    ];

    if (this.chartData[0][1] === 0 && this.chartData[1][1] === 0 && this.chartData[2][1] === 0) {
      this.chart = false;
    } else {
      this.chart = true;
    }
  }

  changeDic(e) {
    console.log(e);

    this.router.navigate(['\details', { id: e.user.id, idDic: e.id }]);
  }

  edit() {
    this.dicDialogService.editDialog(this.dialog, this.mainDic);
  }
}
