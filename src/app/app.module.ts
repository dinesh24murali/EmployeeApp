import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MaterialModule, MdNativeDateModule, MdInputModule, MdSelectModule } from '@angular/material';

import { AppRoutingModule } from './Route/app-routing.module';
import { EmployeeComponent } from './Modules/Record/employee.component';
import { ViewEmployeeComponent } from './Modules/Record/view-employee.component';
import { ConvertFileComponent } from './Modules/Convert/convert-file.component';
import { UploadExcelComponent } from './Modules/Excel/uploadExcel.component';
import { AppComponent } from './Modules/app.component';

import { DialogTempComponent } from './Modules/Shared/dialog-temp.component';

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
        MdSelectModule,
        NgxDatatableModule
    ],
    declarations: [
        AppComponent,
        EmployeeComponent,
        ViewEmployeeComponent,
        DialogTempComponent,
        UploadExcelComponent,
        ConvertFileComponent
    ],
    bootstrap: [AppComponent],
    entryComponents: [ DialogTempComponent],
    providers: [EmployeeService]
})
export class AppModule { }
