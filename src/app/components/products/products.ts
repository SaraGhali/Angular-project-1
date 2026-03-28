import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '../../Models/Store';
import { IProduct } from '../../Models/IProduct';
import { ICategory } from '../../Models/ICategory';
import { ProductCard } from '../product-card/product-card';
import { ProductDetailsComponent } from '../product-details/product-details';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format-pipe';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, ProductCard, ProductDetailsComponent, CreditCardFormatPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  store: Store = {
    Name: 'My Store',
    Branches: ['Branch1', 'Branch2'],
    Logo: './images/OIP.jpg',
  };

  StoreOwner: string = 'Sara Ghali';
  currentDate: Date = new Date();
  creditCardNumber: string = '1234567890123456';
  ProductList: IProduct[] = [
    { ID: 1, Name: 'bookA', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 2, Name: 'bookB', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 3, Name: 'bookC', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 4, Name: 'bookD', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 5, Name: 'bookE', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 6, Name: 'bookF', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 7, Name: 'bookG', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 8, Name: 'bookH', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
  ];

  categories: ICategory[] = [
    { ID: 1, Name: 'Old Books' },
    { ID: 2, Name: 'New Books' },
  ];

  searchTerm: string = '';
  selectedProduct: IProduct | null = null;

  get filteredProducts(): IProduct[] {
    let prods = this.ProductList;
    if (this.searchTerm) {
      prods = prods.filter(p => p.Name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    return prods;
  }

  buy(product: IProduct) {
    if (product.Quantity > 0) {
      product.Quantity--;
    }
  }

  showDetails(product: IProduct) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }
}