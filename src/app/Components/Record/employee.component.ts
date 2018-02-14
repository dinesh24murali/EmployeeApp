import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'reflect-metadata';

import { Employee } from '../../Models/Record/Record';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'record',
  templateUrl: './../../Views/Record/employee.component.html',
  styles: [`
    .record-card{
		width:80%;
		margin-left: 10%;
    }
`]
})
export class EmployeeComponent implements OnInit, OnDestroy {

  @ViewChild('recordTable') recordTable: any;
  @ViewChild('selectFile') selectFile: any;

  private querySubscribe: any;
  id: any;

  empName = new FormControl('', [Validators.required]);
  desig = new FormControl('', [Validators.required]);
  dob = new FormControl('', [Validators.required]);
  sex = 'M';
  salary = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.id = undefined;
    this.querySubscribe = this.route
      .queryParamMap
      .subscribe(params => {
        this.id = params.get('id');
        this.employeeService.getEmployee(this.id)
          .then((result) => {
            this.empName.setValue(result.name);
            this.desig.setValue(result.desig);
            this.dob.setValue(result.dob);
            this.sex = result.sex;
            this.salary.setValue(result.salary);
          });
      });
  }

  ngOnDestroy() {
    this.querySubscribe.unsubscribe();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar,
    private employeeService: EmployeeService
  ) {
  }

  updateRecord() {

    if (this.empName.valid && this.dob.valid && this.salary.valid && this.desig.valid) {
      let date = new Date(this.dob.value);

      let record = { _id: this.id, name: this.empName.value, dob: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(), sex: this.sex, salary: this.salary.value, desig: this.desig.value };
      this.employeeService.updateEmployee(record)
        .then(res => {
          if (!res.error) {
            this._openSnackBar("Employee Updated!", "ok");
            this.router.navigate(['/view']);
          } else
            this._openSnackBar("Employee Not Updated: " + res.Message, "ok");
        });
    } else {
      if (!this.empName.valid)
        this.empName.markAsTouched({ onlySelf: true });
      if (!this.dob.valid)
        this.dob.markAsTouched({ onlySelf: true });
      if (!this.desig.valid)
        this.desig.markAsTouched({ onlySelf: true });
      if (!this.salary.valid)
        this.salary.markAsTouched({ onlySelf: true });
      else
        this._openSnackBar("Fill all Required Fields", "ok");
    }
  }

  _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
