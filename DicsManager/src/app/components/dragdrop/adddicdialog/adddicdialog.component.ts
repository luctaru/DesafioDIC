import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { DicsService } from 'src/app/services/connection/dics.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Status } from 'src/app/interfaces/status';
import { Periods } from 'src/app/interfaces/periods';
import { UsersService } from 'src/app/services/connection/users.service';
import { StatusService } from 'src/app/services/connection/status.service';
import { PeriodsService } from 'src/app/services/connection/periods.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { OperationdialogComponent } from '../../operationdialog/operationdialog.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Dics } from 'src/app/interfaces/dics';

@Component({
  selector: 'app-adddicdialog',
  templateUrl: './adddicdialog.component.html',
  styleUrls: ['./adddicdialog.component.css']
})
export class AdddicdialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  temp: Dics;
  statusArray: Array<Status>;
  userArray: Array<Users>;
  periodArray: Array<Periods>;

  filteredOptions: Observable<Users[]>;

  constructor(
    private dicService: DicsService,
    private userService: UsersService,
    private statusService: StatusService,
    private periodService: PeriodsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AdddicdialogComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      user: ['', Validators.required],
      status: ['', Validators.required],
      period: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      description: ['', Validators.required]
    });

    this.statusList();
    this.periodList();
    this.userList();
  }

  displayFn(user?: Users): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Users[] {
    const filterValue = name.toLowerCase();

    return this.userArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  userList() {
    this.userService.getAllUsers().subscribe(e => {
      this.userArray = [];
      this.userArray = e;
      this.filteredOptions = this.firstFormGroup.get('user').valueChanges
        .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.userArray.slice())
      );
    });
  }

  statusList() {
    this.statusService.getAllStatus().subscribe(e => {
      this.statusArray = [];
      this.statusArray = e;
    });
  }

  periodList() {
    this.periodService.getAllPeriods().subscribe(e => {
      this.periodArray = [];
      this.periodArray = e;
    });
  }

  save() {
    console.log(this.firstFormGroup.value);
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.temp = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };
      this.dialogRef.close({ data: this.temp, closed: true });
    } else {
      const dialogRef = this.dialog.open(OperationdialogComponent, {
        disableClose: false,
        data: {
          operation: 'invalid'
        }
      });
    }
  }

}
