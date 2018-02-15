import { Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './../../Templates/dialog-template.html'
})
export class DialogTempComponent {
  public title:string;
  public message: string;
  public hasCancel: boolean;

  constructor(public dialogRef: MdDialogRef<DialogTempComponent>) {
    this.hasCancel = true;
  }
}