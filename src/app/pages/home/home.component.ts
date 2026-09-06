import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  userName: string = '';
  constructor(private ps: ProductService,private router: Router) {}

  ngOnInit() {
    this.load();
    //  this.userName = localStorage.getItem('username') || '';
    // console.log('Username from localStorage:', this.userName);
     const token = localStorage.getItem('token');
  if (token){
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(" username:", payload.username);
    this.userName = payload.username;
  } 
 
  }

  load() {
    this.ps.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

   logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
