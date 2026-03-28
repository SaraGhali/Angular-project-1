import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Models/IProduct';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  standalone: true
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() closeDetails = new EventEmitter();

  onClose() {
    this.closeDetails.emit();
  }
}
