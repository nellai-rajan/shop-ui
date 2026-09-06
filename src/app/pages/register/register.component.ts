import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private productservice: ProductService, private router: Router) {}

  register() {
      if (!this.username || !this.email || !this.password) {
    alert("All fields are required");
    return;
  }
    this.productservice.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe(() => {

      alert("Registered successfully");

      this.router.navigate(['/login']);
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
