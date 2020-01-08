import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "src/app/models";
import { ProductService } from "src/app/services/product.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";

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
      let item = this.dataSource.data.find(
        d => d.ProductId == product.ProductId
      );
      const index = this.dataSource.data.indexOf(item);

      this.dataSource.data[index] = result;
      this.dataSource.data = [...this.dataSource.data];
    });
  }
}
