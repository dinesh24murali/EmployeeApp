import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from '../Components/Record/employee.component';
import { UploadExcelComponent } from '../Components/Excel/uploadExcel.component';
import { ViewEmployeeComponent } from '../Components/Record/view-employee.component';
import { ConvertFileComponent } from '../Components/Convert/convert-file.component';

const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ViewEmployeeComponent },
  { path: 'upload', component: UploadExcelComponent },
  { path: 'convert', component: ConvertFileComponent },
  { path: 'edit', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }