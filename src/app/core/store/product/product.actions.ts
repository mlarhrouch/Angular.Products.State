import { tap } from "rxjs/operators";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  GetProducts,
  UpdateProduct,
  DeleteProduct,
  AddProduct
} from "./product.state";
import { Product } from "../../models";
import { ProductService } from "../../services";

export class ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: "products",
  defaults: {
    products: []
  }
})
export class ProductState {
  constructor(private productService: ProductService) {}

  @Selector()
  static getProductsList(state: ProductStateModel) {
    return state.products;
  }

  @Action(GetProducts)
  getProducts(
    { getState, setState }: StateContext<ProductStateModel>,
    {}: GetProducts
  ) {
    return this.productService.getAll().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          products: result
        });
      })
    );
  }

  @Action(AddProduct)
  addProduct(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    return this.productService.add(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          products: [...state.products, result]
        });
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(
    { getState, setState }: StateContext<ProductStateModel>,
    { payload }: UpdateProduct
  ) {
    return this.productService.update(payload).pipe(
      tap(result => {
        const state = getState();
        const list = [...state.products];
        const index = list.findIndex(item => item.id === payload.id);
        list[index] = result;
        setState({
          ...state,
          products: list
        });
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(
    { getState, setState }: StateContext<ProductStateModel>,
    { id }: DeleteProduct
  ) {
    return this.productService.delete(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.products.filter(item => item.id !== id);
        setState({
          ...state,
          products: filteredArray
        });
      })
    );
  }
}
