import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { OrderComponent } from "./pages/order/order.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../../auth.gurd';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent , canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
