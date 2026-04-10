import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '../../Models/IProduct';
import { ProductsService } from '../../services/productsService';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  standalone: true
})
export class ProductDetailsComponent implements OnInit {
  @Input() product?: IProduct;
  @Output() closeDetails = new EventEmitter();

  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  constructor(){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productsService.getProductById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error('Error fetching product details:', err)
      });
    }
  }
  
  onClose() {
    this.closeDetails.emit();
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  buy(product: IProduct) {
    this.productsService.buy(product);
  }
}

