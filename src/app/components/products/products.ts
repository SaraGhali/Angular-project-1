import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
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
export class Products implements OnInit, OnChanges {
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

  // These could also be fetched from API if needed
  categories: ICategory[] = [];

  @Input() searchTerm: string = '';
  selectedProduct: IProduct | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.ProductList = data;
        this.filteredProducts = data;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      if (!this.searchTerm.trim()) {
        this.filteredProducts = this.ProductList;
      } else {
        this.productsService.searchProducts({ title: this.searchTerm }).subscribe({
          next: (data) => this.filteredProducts = data,
          error: (err) => console.error('Error searching products:', err)
        });
      }
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

