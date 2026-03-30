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
export class ProductDetailsComponent {
  @Input() product?: IProduct;
  @Output() closeDetails = new EventEmitter();

  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  constructor(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.product = this.productsService.getProductById(id);
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
