// import { Item } from '../../../Models/Record/Record';
// import { MdDialogRef, MdDialogConfig, MdSnackBar, MdDialog } from '@angular/material';
// import { AddNewProductDialog } from '../../Shared/addNewProduct-temp.component';
// export class PurchaseHelper {
//   constructor(public snackBar: MdSnackBar, public dialog: MdDialog) { }
//   AddNewProduct(selectedItems: any[]) {
//     let config = new MdDialogConfig(), selectedOption,
//       dialogRef: MdDialogRef<AddNewProductDialog> = this.dialog.open(AddNewProductDialog, {
//         height: '60%',
//         width: '60%'
//       });
//     dialogRef.afterClosed().subscribe(result => {
//       let selectedOption = result,
//         dialogCtrls = dialogRef.componentInstance;
//       if (result == "OK") {
//         if (dialogCtrls.name.valid && dialogCtrls.manufacturer.valid && dialogCtrls.tax_percent.valid && dialogCtrls.BatchNo.valid && dialogCtrls.Exp_date.valid && dialogCtrls.Exp_date.value.split('/')[0] <= 12 && dialogCtrls.mrp.valid && dialogCtrls.P_rate.valid) {
//           let NewItem: any = {
//             Pid: "",
//             Pname: dialogCtrls.name.value,
//             manufacturer: dialogCtrls.manufacturer.value,
//             type: dialogCtrls.type,
//             tax_percent: dialogCtrls.tax_percent.value,
//             BatchNo: dialogCtrls.BatchNo.value,
//             Batches: [],
//             Exp_date: dialogCtrls.Exp_date.value,
//             qty: 0,
//             stock: 0,
//             mrp: dialogCtrls.mrp.value,
//             newBatchFlag: true,
//             P_rate: dialogCtrls.P_rate.value
//           };
//           this.snackBar.open("Record Added", "ok", {
//             duration: 3000
//           });
//           selectedItems.push(NewItem);
//         } else
//           this.snackBar.open("Invalied Details", "ok", {
//             duration: 3000
//           });
//       }
//     });
//   }
// } 
//# sourceMappingURL=PurchaseHelper.js.map