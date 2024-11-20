import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product> = [];

  //products!: Observable<Product[]>;

  public keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private productService: ProductService, private router:Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.body as Product[];
          let totalProducts: number = parseInt(data.headers.get('x-total-count')!); // Indique à TypeScript que cette valeur n'est pas null
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if (totalProducts % this.pageSize != 0) { // Ajout d'une page supplémentaire si nécessaire
            this.totalPages = this.totalPages + 1;
          }
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
    if (confirm("Are you sure ?")) {
      this.productService.deleteProduct(product).subscribe({
        next: deleted => {
          //this.getProducts()
          this.products = this.products.filter(p => p.id != product.id);
        }
      });
    }
  }

  /*searchProducts() {
    this.currentPage = 1;
    this.totalPages = 0;
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: value => {
          console.log('Résultats reçus :', value);
          this.products = value;
        },
        error: err => {
          console.error('Erreur lors de la recherche :', err);
        }
      });
  }*/

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.getProducts()
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
