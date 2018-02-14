import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { MdSnackBar, MdDialogRef, MdDialog, MdDialogConfig, MdSidenav } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { DialogTempComponent } from '../Shared/dialog-temp.component';
import { ExceptionDialog } from '../Shared/exception-dialog.component';
import { Employee } from '../../Models/Record/Record';
import { EmployeeService } from '../../Services/employee.service';


@Component({
    selector: 'view-employee',
    templateUrl: './../../Views/Record/view-employee.component.html',
    styles: [`
  .viewRecord{
    padding: 20px 20px 20px 20px;
  }
  .view-container{
    width:1000px;
  }
  md-sidenav-container {
    position: fixed;
    height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 80%;
 }
  `],
    providers: [EmployeeService]
})
export class ViewEmployeeComponent implements OnInit {

    loadingIndicator: boolean = true;
    employeeList: Employee[] = [];
    isDeleteRecord: boolean = false;
    id: any;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public snackBar: MdSnackBar,
        public dialog: MdDialog,
        private employeeService: EmployeeService) { }

    ngOnInit(): void {

        this.id = undefined;
        this.employeeService.getEmployees().then((result) => {
            this.employeeList = result;
            this.loadingIndicator = false;
        });

    }
    /*
    * function used to send delete request
    * {row} contains the record need to delete
    */
    deleteRecord(row: any): void {
        let record = this.employeeList.find(item => item._id === row._id);
        this.isDeleteRecord = true;
        let deleteIndex = this.employeeList.indexOf(record);
        this.employeeList.splice(deleteIndex, 1);
        this.employeeList = [...this.employeeList];
        this.employeeService.deleteEmployee(record._id).then((res) => {
            this.isDeleteRecord = false;
            this.snackBar.open('Movie Deleted', 'Ok', {
                duration: 3000
            });
        });
    }
    /*
    * function used to route to the edit window
    * {row} contains the record need to edit and used to pass the id of record needed to edit
    */
    editRecord(row: Employee): void {
        let Id = row._id;
        this.router.navigate(['/edit'], { queryParams: { id: Id } });
    }

    openDialog(row: any): void {
        let config = new MdDialogConfig(),
            dialogRef: MdDialogRef<DialogTempComponent> = this.dialog.open(DialogTempComponent, config);
        dialogRef.componentInstance.title = "Confirm Delete";
        dialogRef.componentInstance.message = "Are you sure you want to delete?";
    }
}