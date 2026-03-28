import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../Models/IProduct';
import { CardShadow } from '../../directives/card-shadow';

@Component({
  selector: 'app-product-card',
  imports: [CardShadow, CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;

  @Output() buyProduct = new EventEmitter();
  @Output() showProductDetails = new EventEmitter();

  onBuy() {
    this.buyProduct.emit(this.product);
  }

  ShowDetails() {
    this.showProductDetails.emit(this.product);
  }
}
