import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../models";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/all`);
  }

  add(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}/add`, product);
  }

  update(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}/update`, product);
  }

  delete(productId: number) {
    return this.http.delete(`${environment.apiUrl}/delete/${productId}`);
  }
}
