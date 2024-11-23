import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://localhost:8088/products";

  constructor(private http: HttpClient) {
  }

  public getProducts(keyword: string = '', page: number = 1, size: number = 4) {
    return this.http.get(`${this.url}?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'}); // get headers HttpResponse
  }

  public checkProduct(product: Product) {
    return this.http.patch<Product>(`${this.url}/${product.id}`, {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.http.delete<Product>(`${this.url}/${product.id}`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.url}`, product);
  }

  /*public searchProducts(keyword: string, page: number = 1, size: number = 4): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8088/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }*/

  getProductsById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }
}
