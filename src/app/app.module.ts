import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MaterialModule, MdNativeDateModule, MdInputModule, MdSelectModule } from '@angular/material';

import { AppRoutingModule } from './Route/app-routing.module';
import { EmployeeComponent } from './Components/Record/employee.component';
import { ViewEmployeeComponent } from './Components/Record/view-employee.component';
import { ConvertFileComponent } from './Components/Convert/convert-file.component';
import { UploadExcelComponent } from './Components/Excel/uploadExcel.component';
import { SampleComponent } from './Components/Record/sample.component';
import { AppComponent } from './Components/app.component';

import { DialogTempComponent } from './Components/Shared/dialog-temp.component';
import { AddNewProductDialog } from './Components/Shared/addNewProduct-temp.component';
import { ExceptionDialog } from './Components/Shared/exception-dialog.component';
// import { PeekRecord } from './Components/Shared/peek-record.component';

import { EmployeeService } from './Services/employee.service';

import 'hammerjs/hammer';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MdNativeDateModule,
        AppRoutingModule,
        MdInputModule,
        CdkTableModule,
        MdSelectModule,
        NgxDatatableModule
    ],
    declarations: [
        AppComponent,
        EmployeeComponent,
        ViewEmployeeComponent,
        AddNewProductDialog,
        DialogTempComponent,
        UploadExcelComponent,
        SampleComponent,
        ConvertFileComponent,
        ExceptionDialog
        // PeekRecord
    ],
    bootstrap: [AppComponent],
    entryComponents: [AddNewProductDialog, DialogTempComponent, ExceptionDialog],
    providers: [EmployeeService]
})
export class AppModule { }
