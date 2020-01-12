import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from "src/app/models";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ProductService } from "src/app/products/services";
import { MatSnackBar } from "@angular/material/snack-bar";

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

    this.nameCtrl = new FormControl(data.ProductName, Validators.required);
    this.quantityCtrl = new FormControl(data.Quantity, Validators.required);
    this.priceCtrl = new FormControl(data.Price, Validators.required);
    this.idCtrl = new FormControl(data.ProductId);

    this.form = new FormGroup({
      productName: this.nameCtrl,
      quantity: this.quantityCtrl,
      price: this.priceCtrl,
      productId: this.idCtrl
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
