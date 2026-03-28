import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', component: NotFoundComponent }
];
