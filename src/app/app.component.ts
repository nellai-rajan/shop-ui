import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stores';
  page = 'home';
  token: string | null = null;
  showAdmin: boolean = false;
 constructor(private router:Router){ }

 ngOnInit(){
  this.getUserRole()
 }
 getUserRole() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log("User Role:", payload.role);

  if(payload.role === 'admin-user') {
    this.showAdmin=true
  }else{
 this.showAdmin=false
  }
  return payload.role;
}
 goHome() {
  console.log("ENTER HOME PAGE")
  this.router.navigate(['/home']);
}
 goAdmin() {
  this.router.navigate(['/admin']);
}
 goOrder() {
  this.router.navigate(['/order']);
}
goContact() {
  this.router.navigate(['/contact']);
}
products = [
  { name: 'Apple', price: 120, img: 'https://source.unsplash.com/200x200/?apple' },
  { name: 'Banana', price: 60, img: 'https://source.unsplash.com/200x200/?banana' }
];

name = '';
price = '';
img = '';

custName = '';
phone = '';
items = '';

add() {
  this.products.push({
    name: this.name,
    price: +this.price,
    img: this.img
  });
}

showHeader() {
  return this.router.url !== '/login' && this.router.url !== '/register';
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
}


}
