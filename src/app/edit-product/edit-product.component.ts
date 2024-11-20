import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: number;
  productForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductsById(this.productId).subscribe({
      next: (product) => {
        this.productForm = this.formBuilder.group({
          id: this.formBuilder.control(product.id),
          name: this.formBuilder.control(product.name, [Validators.required]),
          price: this.formBuilder.control(product.price, [Validators.min(100)]),
          checked: this.formBuilder.control(product.checked)
        })
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  updateProduct() {
    let product: Product = this.productForm.value;
    this.productService.updateProduct(product).subscribe({
      next: updated => {
        alert(JSON.stringify(updated));
      }, error: err => {
        console.log(err);
      }
    })
  }
}
