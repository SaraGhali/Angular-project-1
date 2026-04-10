import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/productsService';
import { IProduct } from '../../Models/IProduct';
import { ProductCard } from '../product-card/product-card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCard],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css'
})
export class SearchProducts {
  private productsService = inject(ProductsService);
  private toastr = inject(ToastrService);

  searchForm = new FormGroup({
    title: new FormControl(''),
    price_min: new FormControl<number | null>(null),
    price_max: new FormControl<number | null>(null)
  });

  results: IProduct[] = [];
  isSearching = false;

  onSearch() {
    this.isSearching = true;
    const { title, price_min, price_max } = this.searchForm.value;
    
    this.productsService.searchProducts({ 
      title: title || undefined, 
      price_min: price_min || undefined, 
      price_max: price_max || undefined 
    }).subscribe({
      next: (data) => {
        this.results = data;
        this.isSearching = false;
        this.toastr.info(`Search completed. Found ${data.length} products.`, 'Search');
      },
      error: (err) => {
        this.isSearching = false;
        this.toastr.error('Error during search', 'Error');
        console.error(err);
      }
    });
  }
}
