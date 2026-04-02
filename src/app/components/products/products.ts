import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '../../Models/Store';
import { IProduct } from '../../Models/IProduct';
import { ICategory } from '../../Models/ICategory';
import { ProductCard } from '../product-card/product-card';
import { ProductDetailsComponent } from '../product-details/product-details';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format-pipe';
import { ProductsService } from '../../services/productsService';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, ProductCard, ProductDetailsComponent, CreditCardFormatPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnChanges {
  store: Store = {
    Name: 'My Store',
    Branches: ['Branch1', 'Branch2'],
    Logo: './images/OIP.jpg',
  };

  StoreOwner: string = 'Sara Ghali';
  currentDate: Date = new Date();
  creditCardNumber: string = '1234567890123456';

  private productsService = inject(ProductsService);
  ProductList: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  categories: ICategory[] = [
    { ID: 1, Name: 'Old Books' },
    { ID: 2, Name: 'New Books' },
  ];

  @Input() searchTerm: string = '';
  selectedProduct: IProduct | null = null;

  constructor() {
    this.ProductList = this.productsService.getProducts();
    this.filteredProducts = this.ProductList;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filteredProducts = this.productsService.searchProducts(this.searchTerm);
    }
  }

  buy(product: IProduct) {
    this.productsService.buy(product);
  }

  showDetails(product: IProduct) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }
}
