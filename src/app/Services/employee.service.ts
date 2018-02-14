import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Employee } from '../Models/Record/Record';


@Injectable()
export class EmployeeService {

    constructor(private http: Http) { }

    updateEmployee(employee: Employee): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:4000/employee", 'query=mutation{handleEmployeeMutation {updateEmployee(input: {_id:"' + employee._id + '",name:"' + employee.name + '",desig:"' + employee.desig + '",sex:"' + employee.sex + '",salary:"' + employee.salary + '",dob:"' + employee.dob + '"} ){error,message}}}', options).toPromise()
            .then((response: any) => {
                if (response._body) {
                    var records = JSON.parse(response._body);
                    return records.data.handleEmployeeMutation.updateEmployee;
                }
            }).catch(function (response) {
                return { error: true, type: 'Network Error' };
            });
    }

    getEmployees(): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:4000/employee", 'query=query{handleEmployees {getEmployees{ _id,name,desig,sex,salary,dob}}}', options).toPromise()
            .then((response: any) => {
                if (response._body) {
                    var records = JSON.parse(response._body);
                    return records.data.handleEmployees.getEmployees;
                }
            }).catch(function (response) {
                return { error: true, type: 'Network Error' };
            });
    }

    getEmployee(id: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:4000/employee", 'query=query{handleEmployees{getEmployee(id:"' + id + '"){ name,desig,sex,salary,dob}}}', options).toPromise()
            .then((response: any) => {
                if (response._body) {
                    var records = JSON.parse(response._body);
                    return records.data.handleEmployees.getEmployee;
                }
            }).catch(function (response) {
                return { error: true, type: 'Network Error' };
            });
    }

    deleteEmployee(id): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:4000/employee", 'query=mutation{handleEmployeeMutation{deleteEmployee(id:"' + id + '"){ error,message}}}', options).toPromise()
            .then((response: any) => {
                if (response._body) {
                    var records = JSON.parse(response._body);
                    return records.data.handleEmployeeMutation.deleteEmployee;
                }
            }).catch(function (response) {
                return { error: true, type: 'Network Error' };
            });
    }

    uploadEmployee(records: any): Promise<any> {
        if(records.length <=0 )
            return ;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:4000/employee", 'query=mutation{handleEmployeeMutation {uploadEmployees(records: ' + JSON.stringify(records) + ' ){error,message}}}', options).toPromise()
            .then((response: any) => {
                if (response._body) {
                    var records = JSON.parse(response._body);
                    return records.data.handleEmployeeMutation.updateEmployees;
                }
            }).catch(function (response) {
                return { error: true, type: 'Network Error' };
            });
    }
}


