import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { NotFoundComponent } from './components/not-found/not-found';
import { Register } from './components/Auth/register/register';
import { Login } from './components/Auth/login/login';
import { Clock } from './components/clock/clock';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'clock', component: Clock },
  { path: '**', component: NotFoundComponent }
];
