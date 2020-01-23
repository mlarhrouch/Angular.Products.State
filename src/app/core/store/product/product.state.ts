import { Product } from "../../models";

export class GetProducts {
  static readonly type = "[Product] Get";

  constructor() {}
}

export class AddProduct {
  static readonly type = "[Product] Add";

  constructor(public payload: Product) {}
}

export class UpdateProduct {
  static readonly type = "[Product] Update";

  constructor(public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = "[Product] Delete";

  constructor(public id: number) {}
}
