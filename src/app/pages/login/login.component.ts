import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   mode: 'login' | 'forgot' | 'reset' = 'login';
  msg = '';
  loginForm!:FormGroup
  forgotForm!:FormGroup
  resetForm!:FormGroup
  showPassword: boolean = false;
  constructor(private fb: FormBuilder, private productservice: ProductService,
    private router:Router
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    this.forgotForm = this.fb.group({
      email: ['', Validators.required]
    });
  
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      otp: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }


  // LOGIN
  login() {
    if (this.loginForm.invalid) return;

    this.productservice.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.msg = 'Login success';
        this.router.navigate(['/home']);   
      },
      error: (err) => this.msg = err.error
    });
  }

  // FORGOT
  sendOtp() {
    this.productservice.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.msg = 'OTP sent';
        this.mode = 'reset'; // auto move
      },
      error: (err) => this.msg = err.error
    });
  }

  // RESET
  reset() {
    this.productservice.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this.msg = 'Password reset success';
        this.mode = 'login';
      },
      error: (err) => this.msg = err.error
    });
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}

goToRegister(){
  this.router.navigate(['/register']);
}

}
