import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  /*public products: Array<Product> = [];

  //products!: Observable<Product[]>;

  public keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;*/

  constructor(private productService: ProductService,
              private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    // ✅ Done with interceptor => app-http-interceptor 👌👌👌
    /*this.appState.setProductState({
      status: "LOADING"
    })*/

    this.productService.getProducts(this.appState.productState.keyword, this.appState.productState.currentPage, this.appState.productState.pageSize)
      .subscribe({
        next: (data) => {
          let products = data.body as Product[];
          let totalProducts: number = parseInt(data.headers.get('x-total-count')!); // Indique à TypeScript que cette valeur n'est pas null
          // this.appState.productState.totalProducts = totalProducts;
          let totalPages = Math.floor(totalProducts / this.appState.productState.pageSize);
          if (totalProducts % this.appState.productState.pageSize != 0) { // Ajout d'une page supplémentaire si nécessaire
            ++totalPages;
          }
          this.appState.setProductState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            // status: "LOADED" // ✅ Done with interceptor
          })
        },
        error: err => {
          this.appState.setProductState({
            status: "ERROR",
            errorMessage: err
          })
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
          this.getProducts()
          //this.appState.productState.products = this.appState.productState.products.filter((p: any) => p.id != product.id);
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
    this.appState.productState.currentPage = page;
    this.getProducts()
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
