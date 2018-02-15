import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import * as xslx from 'ts-xlsx';

import { Employee } from '../../Models/Record/Record';
import { EmployeeService } from '../../Services/employee.service';
import { DialogTempComponent } from '../Shared/dialog-temp.component';

@Component({
    selector: 'excel',
    templateUrl: './uploadExcel.component.html',
    styles: [`
    .progrssSpinnerAlign{
        margin-left: 45%;
    }
    .hideFileInput{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    `]
})
export class UploadExcelComponent implements OnInit {

    // Object used to access the hidden file input box
    @ViewChild('selectFile') selectFile: any;

    constructor(
        private employeeService: EmployeeService,
        public dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    fileName: any = { name: "" };
    uploadDisabled: boolean = true;
    uploading: boolean = false;
    fileReader = new FileReader();
    excelData: string[][];

    ngOnInit(): void {
        // setting listiners for the file reader
        this.fileReader.onload = (event) => {

            const bstr: string = this.fileReader.result;
            let wb = xslx.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];

            /* save data */
            this.excelData = (xslx.utils.sheet_to_json(ws, { header: 1 }));

            if (this.verifyExcelData(this.excelData)) {
                this.excelData.splice(0, 1);    // Sending only the data to backend
                this.employeeService.uploadEmployee(this.excelData)
                    .then((res) => this.afterFileUpload());
            }
        };

        this.fileReader.onloadstart = (event) => {
            this.uploading = this.uploadDisabled = true;
        };
    }
    /* 
    * this function contains operations performed after file is uploaded
    */
    afterFileUpload() {
        this.excelData = [];
        this.uploading = false;
        this.fileName = { name: "" };
        this.snackBar.open('File Uploaded Successfully', 'Ok', {
            duration: 3000
        });
        this.selectFile.nativeElement.value = '';
    }

    /* 
    * this function is used to verify the excel document
    * {data} is a string[][] contains data and fields
    */
    verifyExcelData(data: any): boolean {
        let valiedExcel = true, message = "", hasNullItems = false;
        if (data.length >= 2) {
            let fields = data[0];
            if (fields.length != 5 || fields[0].toLowerCase() != "name" || fields[1].toLowerCase() != "designation" || fields[2].toLowerCase() != "sex" || fields[3].toLowerCase() != "salary" || fields[4].toLowerCase() != "date of birth") {
                message = "Invalied Table Columns: Need data in 'Name','Designation','Sex','Salary','Date of birth' format";
                valiedExcel = false;
            }
            if (valiedExcel) {
                data.forEach((dataArray, index) => {
                    if (index == 0) // Prevents verification for fields row
                        return;
                    // Check if DOB is supplied in the proper format
                    if (!new Date(dataArray[4]).getDate()) {
                        message = "Date supplied for " + dataArray[0] + " is not in the correct format";
                        return valiedExcel = false;
                    }
                    if (Object.keys(dataArray).length != 5) {
                        this.openDialog("There are empty cell in the excel. do you want to upload anyway?", true, true);
                        hasNullItems = true;
                        return false;
                    }
                });
                if (hasNullItems)
                    return false;
            }
        } else {
            valiedExcel = false;
            message = "File Empty";
        }

        if (!valiedExcel) {
            this.selectFile.nativeElement.value = '';
            this.openDialog(message, false, false);
        }
        return valiedExcel;
    }

    /*
    *   Triggers the open file dialog box
    */
    openFile(): void {
        if (this.selectFile.nativeElement)
            this.selectFile.nativeElement.click();
    }
    /*
    *   Checks whether the file is in Excel or csv format
    */
    selectExcel(event: any): void {
        let checkFile = event.target.files[0];
        if (checkFile ? checkFile.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            checkFile.type == "application/vnd.ms-excel" : false) {
            this.fileName = event.target.files[0];
            this.uploadDisabled = false;
        } else {
            this.openDialog("Choose an Excel or CSV file", false, false);
            event.target.value = '';
        }
    }
    /*
    *   Function used to trigger the load file event
    */
    upload(): void {
        if (this.fileName)
            this.fileReader.readAsBinaryString(this.fileName);
        else
            this.snackBar.open('Choose File', 'Ok', {
                duration: 3000
            });
    }

    /*
    * user to open the exception dialog in case of error in file
    * {message} contains the message to display
    * {hasCancel} specifies whether the cancel button is needed in the dialog
    * {hasNull} specifies whether the excel sheet has null values
    */
    openDialog(message: string, hasCancel: boolean, hasNull: boolean): void {
        let config = new MdDialogConfig(), scope = this,
            dialogRef: MdDialogRef<DialogTempComponent> = this.dialog.open(DialogTempComponent, config);
        dialogRef.componentInstance.title = "Warning";
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.hasCancel = hasCancel;

        dialogRef.afterClosed().subscribe(result => {
            let selectedOption = result,
                dialogCtrls = dialogRef.componentInstance;
            if (result == "OK" && hasNull) {
                this.excelData.splice(0, 1);
                this.excelData.forEach((item, index) => {
                    item[0] = item[0] == undefined ? " " : item[0];
                    item[1] = item[1] == undefined ? " " : item[1];
                    item[2] = item[2] == undefined ? " " : item[2];
                    item[3] = item[3] == undefined ? " " : item[3];
                    item[4] = item[4] == undefined ? " " : item[4];
                });

                this.employeeService.uploadEmployee(this.excelData)
                    .then((res) => this.afterFileUpload());
            }
            this.uploading = false;
            this.fileName = { name: "" };
        });
    }
}