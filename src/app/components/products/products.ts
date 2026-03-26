import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '../../Models/Store';
import { IProduct } from '../../Models/IProduct';
import { ICategory } from '../../Models/ICategory';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
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

  ProductList: IProduct[] = [
    { ID: 1, Name: 'bookA', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 2, Name: 'bookB', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 3, Name: 'bookC', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 4, Name: 'bookD', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 5, Name: 'bookE', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 6, Name: 'bookF', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 7, Name: 'bookG', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 1, Name: 'bookH', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
  ];

  categories: ICategory[] = [
    { ID: 1, Name: 'Old Books' },
    { ID: 2, Name: 'New Books' },
  ];

//   selectedCategory: number = 0;

  searchTerm: string = '';

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
    alert(`ID: ${product.ID}\nName: ${product.Name}\nQuantity: ${product.Quantity}\nPrice: $${product.Price}`);
  }

  getQuantityStatus(quantity: number): string {
    switch (true) {
      case quantity === 0:
        return 'Out of stock';
      case quantity === 1:
        return 'Last one item';
      case quantity === 2:
        return 'Last two items';
      default:
        return 'In stock';
    }
  }
}