import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  productAPI = `${environment.apiUrl}/api/products`;
  authAPI = `${environment.apiUrl}/api/auth`;
  orderAPI = `${environment.apiUrl}/api/order`;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.productAPI);
  }

  addProduct(data: any) {
    return this.http.post(this.productAPI, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.productAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.authAPI}/forgot-password`, { email });
  }
  resetPassword(data: any) {
    return this.http.post(`${this.authAPI}/reset-password`, data);
  }
  login(data: any) {
    return this.http.post(`${this.authAPI}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.authAPI}/register`, data);
  }
  updateProduct(id: string, data: any) {
    return this.http.put(`${this.productAPI}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  placeOrder(data: any) {
    return this.http.post(`${this.orderAPI}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}