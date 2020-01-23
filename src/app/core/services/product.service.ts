import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "src/app/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}`);
  }

  add(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}`, product);
  }

  update(product: Product) {
    return this.http.put<Product>(
      `${environment.apiUrl}/${product.id}`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}
