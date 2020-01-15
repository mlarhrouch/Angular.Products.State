import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";

import {
  ProductListComponent,
  ConfirmationDialogComponent,
  ProductDialogComponent
} from "./components";
import { ProductService } from "../core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
  providers: [ProductService],
  entryComponents: [ProductDialogComponent, ConfirmationDialogComponent]
})
export class ProductsModule {}
