import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import * as xslx from 'ts-xlsx';
import { writeFile } from 'xlsx';

import { Employee } from '../../Models/Record/Record';
import { EmployeeService } from '../../Services/employee.service';
import { DialogTempComponent } from '../Shared/dialog-temp.component';

@Component({
    selector: 'excel',
    templateUrl: './convert-file.component.html',
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
export class ConvertFileComponent implements OnInit {
    @ViewChild('selectFile') selectFile: any;

    constructor(
        private employeeService: EmployeeService,
        public dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    fileName: any = { name: "" };
    convertDisabled: boolean = true;
    converting: boolean = false;
    fileReader = new FileReader();
    excelData: string[][];
    reqFormat: string = "Excel";

    ngOnInit(): void {
        // setting listiners for the file reader
        this.fileReader.onload = (event) => {

            const bstr: string = this.fileReader.result;
            let wb = xslx.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            var ws = wb.Sheets[wsname],
                fileName = this.fileName.name.substr(0, this.fileName.name.lastIndexOf('.'));
            // converting the file to the required format
            if (this.reqFormat == "Excel")
                writeFile(wb, fileName + '.xlsx');
            else
                writeFile(wb, fileName + '.csv');
            this.afterConvertFile();
        };

        this.fileReader.onloadstart = (event) => {
            this.converting = this.convertDisabled = true;
        };
    }
    /*
    * function used to perform the tasks after the file is converted
    */
    afterConvertFile() {
        this.excelData = [];
        this.converting = false;
        this.fileName = { name: "" };
        this.snackBar.open('File Converted Successfully', 'Ok', {
            duration: 3000
        });
        this.selectFile.nativeElement.value = '';
    }
    /*
    * function used to trigger the open dialog box
    */
    openFile(): void {
        if (this.selectFile.nativeElement)
            this.selectFile.nativeElement.click();
    }
    /*
    * function called when file is selected
    * {event} contains the event details of the selection change event for file input
    */
    selectExcel(event: any): void {
        let checkFile = event.target.files[0];
        // checking whether excel or csv
        if (checkFile ? checkFile.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            checkFile.type == "application/vnd.ms-excel" : false) {
            if (checkFile.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                this.reqFormat = 'CSV';
            if (checkFile.type == "application/vnd.ms-excel")
                this.reqFormat = 'Excel';
            this.fileName = event.target.files[0];
            this.convertDisabled = false;
        } else {
            this.openDialog("Choose an Excel or CSV file", false);
            event.target.value = '';
        }
    }
    /*
    * function used to trigger file load event
    */
    convert(): void {
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
    */
    openDialog(message: string, hasCancel: boolean): void {
        let config = new MdDialogConfig(), scope = this,
            dialogRef: MdDialogRef<DialogTempComponent> = this.dialog.open(DialogTempComponent, config);
        dialogRef.componentInstance.title = "Warning";
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.hasCancel = hasCancel;
    }
}