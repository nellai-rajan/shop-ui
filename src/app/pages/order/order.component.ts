import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  products: any[] = [];
  cart: any[] = [];
  customerName: string = '';
  phone: string = '';

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  // ✅ Load Products
  loadProducts() {
    this.ps.getProducts().subscribe((res: any) => {
      this.products = res;

      // default quantity
      this.products.forEach(p => {
        p.kg = 1;
        p.unit = p.unit || 'kg';
      });
    });
  }

  // ✅ Add to Cart (FINAL FIX)
  addToCart(product: any) {

    const quantity = Number(product.kg) || 1;
    const unit = product.unit || 'kg';

    const exists = this.cart.find(p => p._id === product._id);

    if (exists) {
      exists.quantity +=  quantity;
      exists.unit = unit;
    } else {
      this.cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: quantity,
        unit: unit
      });
    }

    product.kg = 1;
  }

//   addToCart(product: any) {

//   const quantity = Number(product.kg) || 1;
//   const unit = product.unit || 'kg';

//   const exists = this.cart.find(p => p._id === product._id);

//   if (exists) {
//     exists.quantity += quantity;   // ✅ FIXED (ADD not replace)
//   } else {
//     this.cart.push({
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       quantity: quantity,
//       unit: unit
//     });
//   }

//   product.kg = 1;
// }

  // ✅ Remove Cart Item
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  // ✅ Total Calculation
  getTotal() {
    return this.cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  // ✅ Place Order
  placeOrder() {

    if (!this.customerName || !this.phone) {
      alert("Enter customer name & phone");
      return;
    }

    if (this.cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderPayload = {
      customerName: this.customerName,
      phone: this.phone,
      items: this.cart,
      total: this.getTotal(),
      date: new Date()
    };

    this.ps.placeOrder(orderPayload).subscribe((res: any) => {

      if (res?.whatsappUrls?.length) {
        res.whatsappUrls.forEach((url: string) => {
          window.open(url, '_blank');
        });
      }

      alert("Order placed successfully!");

      // reset
      this.cart = [];
      this.customerName = '';
      this.phone = '';
    });
  }
}