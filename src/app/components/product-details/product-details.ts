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
  isModal = false;

  ngOnInit() {
    // Check if this is a routed component
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.product = this.productsService.getProductById(id);
        this.isModal = false;
        if (!this.product) {
          this.router.navigate(['/products']);
        }
      } else if (this.product) {
        // This is modal mode
        this.isModal = true;
      }
    });
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
