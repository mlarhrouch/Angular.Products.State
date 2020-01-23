import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "src/app/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ProductState, GetProducts, DeleteProduct } from "src/app/core/store";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getProductsList) products: Observable<Product[]>;
  public dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ["name", "quantity", "price", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetProducts());

    this.products.subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    });
  }

  onAdd() {
    this.dialog.open(ProductDialogComponent);
  }

  onEdit(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      data: product
    });
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Do you want to remove this item ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteProduct(product.id)).subscribe(res => {
          this.openSnackBar("Item successfully deleted");
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }
}
