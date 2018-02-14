import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'addNewProductDialog',
    templateUrl: './../../Templates/addNewProductDialog-Template.html'
  })
  export class AddNewProductDialog {
  
    name = new FormControl('', [Validators.required]);
    sex: boolean = false;
    dob = new FormControl('', [Validators.required]);
    bio = new FormControl('', [Validators.required]);
  
    constructor(public dialogRef: MdDialogRef<AddNewProductDialog>) {
  
    }
  }

  // id: string;
  //   name: string;
  //   dob: string;
  //   sex: string;
  //   bio: string;