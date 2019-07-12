import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { DepartmentsService } from 'src/app/services/connection/departments.service';
import { Departments } from 'src/app/interfaces/departments';
import { DicsService } from 'src/app/services/connection/dics.service';
import { ProcessesService } from 'src/app/services/connection/processes.service';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { DepartmentdialogService } from 'src/app/services/dialog/departmentdialog.service';
import { MatDialog } from '@angular/material';
import { ProcessdialogService } from 'src/app/services/dialog/processdialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  departmentArray: any[] = [];
  depArray: any[] = [];
  chartArray: any[] = [];

  dicsProArray: any[] = [];

  processArray: any[] = [];
  proArray: any[] = [];
  chartProArray: any[] = [];

  chartOptions: any;
  chart = false;
  width: any;
  height: any;

  late: any;
  concluded: any;
  lateConcluded: any;
  defined: any;
  todefine: any;

  chartAux: any;

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

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentsService,
    private dicService: DicsService,
    private processService: ProcessesService,
    private periodService: PeriodsService,
    private departmentDialogService: DepartmentdialogService,
    private processDialogService: ProcessdialogService,
    private dialog: MatDialog,
  ) {
    this.authService.showMenu.emit(true);
  }

  ngOnInit() {

    this.chartOptions = {
      colors: ['#FB1C1C', '#5CFB1C', '#FFE932', '#00B2CE', '#5746FF'],
      is3D: true
    };

    this.render();

    this.chart = true;

    this.width = '500';
    this.height = '250';

    if (window.innerWidth <= 360) {
      this.width = '300';
      this.height = '200';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  listen() {
    this.subscription = this.departmentDialogService.emitt.subscribe(() => {
      this.render();
    });
    this.subscription = this.processDialogService.emitt.subscribe(() => {
      this.render();
    });
  }

  render() {
    this.departmentArray = [];
    this.processArray = [];
    this.dicsProArray = [];

    this.departmentService.getAll().subscribe(department => {

      this.depArray = department;

      this.depArray.forEach(i => {
        this.dicService.getAllByDepartment(i).subscribe(dics => {
          this.functionx(i, dics, 1, 'none');
        });
      });
    });

    this.processService.getAll().subscribe(process => {
      this.proArray = process;

      this.proArray.forEach(p => {
        this.dicService.getAllByProcess(p).subscribe(dics => {
          this.functionx(p, dics, 2, 'none');
        });
      });
    });

    this.periodService.getAllPeriods().subscribe(e => {
      this.period = [];
      e.map(item => {
        this.period.push(item);
      });

    });
  }

  functionx(dep, dics, type, period) {
    if (period === 'none') {
      this.late = dics.filter(d => (d.isLate === 1));
      this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0));
      this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1));
      this.defined = dics.filter(d => (d.status.id === 2));
      this.todefine = dics.filter(d => (d.status.id === 1));
    } else if (period === 'year') {
      this.late = dics.filter(d => (d.isLate === 1 && new Date(d.startDate).getFullYear() === this.labelYear));
      this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0
        && new Date(d.startDate).getFullYear() === this.labelYear));
      this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1
        && new Date(d.startDate).getFullYear() === this.labelYear));
      this.defined = dics.filter(d => (d.status.id === 2 && new Date(d.startDate).getFullYear() === this.labelYear));
      this.todefine = dics.filter(d => (d.status.id === 1 && new Date(d.startDate).getFullYear() === this.labelYear));
    }

    const data = [
      ['Late', this.late.length],
      ['Concluded On Time', this.concluded.length],
      ['Concluded after the Deadline', this.lateConcluded.length],
      ['Defined', this.defined.length],
      ['To define', this.todefine.length]
    ];


    if (type === 1) {
      this.chartArray.push(data);
      this.departmentArray.push(dep.name);
    } else {
      this.chartProArray.push(data);
      this.processArray.push(dep.name);
    }

  }

  filterByDepartment(dep) {
    this.processArray = [];
    this.chartProArray = [];
    this.proArray = [];

    if (dep === 'All') {
      this.render();
    } else {
      this.processService.getAll().subscribe(process => {
        this.proArray = process;

        this.proArray.forEach(p => {
          if (p.department.name === dep) {
            this.dicService.getAllByProcess(p).subscribe(dics => {
              this.late = dics.filter(d => (d.isLate === 1));
              this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0));
              this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1));
              this.defined = dics.filter(d => (d.status.id === 2));
              this.todefine = dics.filter(d => (d.status.id === 1));

              const data = [
                ['Late', this.late.length],
                ['Concluded On Time', this.concluded.length],
                ['Concluded after the Deadline', this.lateConcluded.length],
                ['Defined', this.defined.length],
                ['To define', this.todefine.length]
              ];

              this.chartProArray.push(data);
              this.processArray.push(p.name);
            });
          }
        });
      });
    }
  }

  filterYear(e) {
    this.labelYear = e;
    if (this.labelYear !== 'All') {
      this.departmentArray = [];
      this.processArray = [];
      this.dicsProArray = [];
      this.chartArray = [];
      this.chartProArray = [];
      this.depArray = [];
      this.proArray = [];

      this.departmentService.getAll().subscribe(department => {
        this.depArray = department;
        this.depArray.forEach(i => {
          this.dicService.getAllByDepartment(i).subscribe(dics => {
            this.functionx(i, dics, 1, 'year');
          });
        });
      });

      this.processService.getAll().subscribe(process => {
        this.proArray = process;
        this.proArray.forEach(p => {
          this.dicService.getAllByProcess(p).subscribe(dics => {
            this.functionx(p, dics, 2, 'year');
          });
        });
      });

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
    this.departmentArray = [];
    this.processArray = [];
    this.dicsProArray = [];
    this.chartArray = [];
    this.chartProArray = [];
    this.depArray = [];
    this.proArray = [];

    this.departmentService.getAll().subscribe(department => {
      this.depArray = department;
      this.depArray.forEach(x => {
        this.dicService.getAllByDepartment(x).subscribe(dics => {
          this.late = dics.filter(d => (d.isLate === 1
            && new Date(d.startDate).getFullYear() === y));
          this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.defined = dics.filter(d => (d.status.id === 2
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.todefine = dics.filter(d => (d.status.id === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));


          const data = [
            ['Late', this.late.length],
            ['Concluded On Time', this.concluded.length],
            ['Concluded after the Deadline', this.lateConcluded.length],
            ['Defined', this.defined.length],
            ['To define', this.todefine.length]
          ];
          this.chartArray.push(data);
          this.departmentArray.push(x.name);
        });
      });
    });

    this.processService.getAll().subscribe(process => {
      this.proArray = process;
      this.proArray.forEach(p => {
        this.dicService.getAllByProcess(p).subscribe(dics => {
          this.late = dics.filter(d => (d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.defined = dics.filter(d => (d.status.id === 2
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));
          this.todefine = dics.filter(d => (d.status.id === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() >= i && new Date(d.startDate).getUTCMonth() < e));


          const data = [
            ['Late', this.late.length],
            ['Concluded On Time', this.concluded.length],
            ['Concluded after the Deadline', this.lateConcluded.length],
            ['Defined', this.defined.length],
            ['To define', this.todefine.length]
          ];

          if (this.late.length !== 0 || this.concluded.length !== 0 || this.lateConcluded.length !== 0 ||
            this.defined.length !== 0 || this.todefine.length !== 0) {
            this.chartProArray.push(data);
            this.processArray.push(p.name);
          }
        });
      });
    });

  }

  filterMonth(i, y) {

    this.departmentArray = [];
    this.processArray = [];
    this.dicsProArray = [];
    this.chartArray = [];
    this.chartProArray = [];
    this.depArray = [];
    this.proArray = [];

    this.departmentService.getAll().subscribe(department => {
      this.depArray = department;
      this.depArray.forEach(x => {
        this.dicService.getAllByDepartment(x).subscribe(dics => {
          this.late = dics.filter(d => (d.isLate === 1
            && new Date(d.startDate).getFullYear() === y));
          this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.defined = dics.filter(d => (d.status.id === 2
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.todefine = dics.filter(d => (d.status.id === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));


          const data = [
            ['Late', this.late.length],
            ['Concluded On Time', this.concluded.length],
            ['Concluded after the Deadline', this.lateConcluded.length],
            ['Defined', this.defined.length],
            ['To define', this.todefine.length]
          ];
          this.chartArray.push(data);
          this.departmentArray.push(x.name);
        });
      });
    });

    this.processService.getAll().subscribe(process => {
      this.proArray = process;
      this.proArray.forEach(p => {
        this.dicService.getAllByProcess(p).subscribe(dics => {
          this.late = dics.filter(d => (d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.concluded = dics.filter(d => (d.status.id === 3 && d.isLate === 0
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.lateConcluded = dics.filter(d => (d.status.id === 3 && d.isLate === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.defined = dics.filter(d => (d.status.id === 2
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));
          this.todefine = dics.filter(d => (d.status.id === 1
            && new Date(d.startDate).getFullYear() === y
            && new Date(d.startDate).getUTCMonth() === i));


          const data = [
            ['Late', this.late.length],
            ['Concluded On Time', this.concluded.length],
            ['Concluded after the Deadline', this.lateConcluded.length],
            ['Defined', this.defined.length],
            ['To define', this.todefine.length]
          ];

          if (this.late.length !== 0 || this.concluded.length !== 0 || this.lateConcluded.length !== 0 ||
            this.defined.length !== 0 || this.todefine.length !== 0) {
            this.chartProArray.push(data);
            this.processArray.push(p.name);
          }
        });
      });
    });
  }

  editDepartment(dep) {
    this.departmentService.getAll().subscribe(department => {
      department.forEach(e => {
        if (e.name === dep) {
          this.departmentDialogService.editDialog(this.dialog, 'edit', e);
        }
      });
    });
  }

  editProcess(pro) {
    this.processService.getAll().subscribe(process => {
      process.forEach(e => {
        if (e.name === pro) {
          this.processDialogService.editProcessDialog(this.dialog, 'edit', e);
        }
      });
    });
  }

  deleteDepartment(dep) {
    this.departmentService.getAll().subscribe(department => {
      department.forEach(e => {
        if (e.name === dep) {
          this.departmentDialogService.deleteDialog(this.dialog, e);
        }
      });
    });
  }

  deleteProcess(pro) {
    this.processService.getAll().subscribe(process => {
      process.forEach(e => {
        if (e.name === pro) {
          this.processDialogService.deleteDialog(this.dialog, e);
        }
      });
    });
  }

  addDepartment() {
    this.departmentDialogService.editDialog(this.dialog, 'add', null);
  }

  addProcess() {
    this.processDialogService.editProcessDialog(this.dialog, 'add', null);
  }
}
