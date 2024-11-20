import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product> = [];

  //products!: Observable<Product[]>;

  public keyword: string = "";

  constructor(private productService: ProductService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(1,4)
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      })
    //this.products = this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next: updated => {
          product.checked = !product.checked;
        }
      })
  }

  handleDeleteProduct(product: Product) {
    if (confirm("Are you sure you want to delete this product?")) {
    }
    this.productService.deleteProduct(product).subscribe({
      next: deleted => {
        //this.getProducts()
        this.products = this.products.filter(p => p.id != product.id);
      }
    });
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword)
      .subscribe({
        next: value => {
          console.log('Résultats reçus :', value);
          this.products = value;
        },
        error: err => {
          console.error('Erreur lors de la recherche :', err);
        }
      });
  }

}
