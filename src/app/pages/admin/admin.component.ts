import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  products: any[] = [];

  name = '';
  price = '';
  img = '';
  quantity = 1;
  unit = 'kg';
  editId: string | null = null;
  editIndex = -1;

  constructor(private ps: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.ps.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  // ADD + UPDATE
  add() {

    const payload = {
      name: this.name,
      price: this.price,
      img: this.img,
      unit: this.unit,
      quantity: this.quantity
    };

    // CREATE
    if (!this.editId) {
      this.ps.addProduct(payload).subscribe(() => {
        alert("Product Added");
        this.clear();
        this.loadProducts();
      });

    }
    // UPDATE
    else {
      this.ps.updateProduct(this.editId, payload).subscribe(() => {
        alert("Product Updated");
        this.clear();
        this.editId = null;
        this.editIndex = -1;
        this.loadProducts();
      });
    }
  }

  // EDIT
  edit(i: number) {
    this.editIndex = i;

    const product = this.products[i];

    this.editId = product._id;

    this.name = product.name;
    this.price = product.price;
    this.unit = product.unit;
    this.img = product.img;
    this.quantity = product.quantity;
  }

  // DELETE
  remove(id: string) {
    this.ps.deleteProduct(id).subscribe(() => {
      alert("Product Deleted");
      this.loadProducts();
    });
  }

  clear() {
    this.name = '';
    this.price = '';
    this.img = '';
    this.quantity = 1;
    this.unit = 'kg';
  }
}