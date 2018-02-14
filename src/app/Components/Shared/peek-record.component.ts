import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { Employee } from '../../Models/Record/Record';
// import { MovieService } from '../../Services/movie.service';

@Component({
    selector: 'peek-record',
    templateUrl: './../../Views/Record/peek-record.component.html',
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
    `]
})
export class PeekRecord {

    // _id: string = '';
    // @Input() public name: string = '';
    // @Input() public year: string = '';
    // @Input() public producer: Producer = {id:"",name:"",sex:"",dob:"",bio:""};
    // @Input() public plot: string = '';
    // @Input() public poster: string = '';
    // @Input('movieId')
    // set Id(billId: string) {
    //     this._id = billId;
    //     this.fetchRecordData();
    // }
    // get Id() {
    //     return this._id;
    // }

    // @Output() public deleteRecordEvent = new EventEmitter<string>();

    // private peek_recordItems: Actor[] = [{ "id": "act-1", "name": "Actor1", "dob": "03-05-2018", "sex": "M", "bio": "male" }, { "id": "act-2", "name": "Actor2", "dob": "03-05-2018", "sex": "M", "bio": "male" }];

    // constructor(private movieService: MovieService, private router: Router) { }

    // fetchRecordData() {
    //     // if (this._id)
    //         // this.movieService.GetMovieData(this._id)
    //         //     .then(res => {
    //         //         this.peek_recordItems = res;
    //         //     });
    // }

    // editRecord() {
    //     this.router.navigate(['/editMovie'], { queryParams: { id: this._id } });
    // }

    // deleteRecord() {
    //     // this.purchaseService.DeletePurchaseRecord(this._billId)
    //     //     .then(res => {
    //     //         if (res.Error)
    //     //             this.deleteRecordEvent.emit(res.Message);
    //     //         else
    //     //             this.deleteRecordEvent.emit('');
    //     //     });
    // }
}    