import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product, ProductService } from "src/app/core";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.scss"]
})
export class ProductDialogComponent implements OnInit {
  nameCtrl: FormControl;
  quantityCtrl: FormControl;
  priceCtrl: FormControl;
  idCtrl: FormControl;
  form: FormGroup;
  editMode = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
    if (!data) {
      data = new Product();
      this.editMode = false;
    }

    this.nameCtrl = new FormControl(data.name, Validators.required);
    this.quantityCtrl = new FormControl(data.quantity, Validators.required);
    this.priceCtrl = new FormControl(data.price, Validators.required);
    this.idCtrl = new FormControl(data.id);

    this.form = new FormGroup({
      name: this.nameCtrl,
      quantity: this.quantityCtrl,
      price: this.priceCtrl,
      id: this.idCtrl
    });
  }

  ngOnInit() {}

  doSave() {
    if (this.editMode) {
      this.doUpdate();
    } else {
      this.doAdd();
    }
  }

  doUpdate() {
    this.productService.update(this.form.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
        this.openSnackBar("Successfully updated");
      }
    });
  }

  doAdd() {
    this.productService.add(this.form.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
        this.openSnackBar("Successfully added");
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }
}
