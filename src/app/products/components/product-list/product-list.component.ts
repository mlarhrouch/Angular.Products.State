import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product, ProductService } from "src/app/core";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ["name", "quantity", "price", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(res => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = res;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(ProductDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data = [...this.dataSource.data, result];
    });
  }

  onEdit(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      let item = this.dataSource.data.find(d => d.id == product.id);
      const index = this.dataSource.data.indexOf(item);

      this.dataSource.data[index] = result;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Do you want to remove this item ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(product.id).subscribe(res => {
          if (res) {
            let item = this.dataSource.data.find(d => d.id == product.id);
            const index = this.dataSource.data.indexOf(item);

            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [...this.dataSource.data];

            this.openSnackBar("Item successfully deleted");
          }
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }
}
