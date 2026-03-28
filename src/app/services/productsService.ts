import { Injectable } from '@angular/core';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private ProductList: IProduct[] = [
    { ID: 1, Name: 'bookA', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 2, Name: 'bookB', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 3, Name: 'bookC', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 4, Name: 'bookD', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 5, Name: 'bookE', Quantity: 0, Price: 20, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 6, Name: 'bookF', Quantity: 2, Price: 15, Img: './images/OIP.jpg', CategoryID: 2 },
    { ID: 7, Name: 'bookG', Quantity: 5, Price: 500, Img: './images/OIP.jpg', CategoryID: 1 },
    { ID: 8, Name: 'bookH', Quantity: 10, Price: 1000, Img: './images/OIP.jpg', CategoryID: 1 },
  ];
  
  
  getProducts(): IProduct[] {
    return this.ProductList;
  }

  getProductById(id: number): IProduct | undefined {
    return this.ProductList.find(p => p.ID === id);
  }

  deleteProduct(id: number): void {
    const index = this.ProductList.findIndex(p => p.ID === id);
    if (index !== -1) {
      this.ProductList.splice(index, 1);
    }
  }
  buy(product: IProduct): void {
    if (product.Quantity > 0) {
      product.Quantity--;
    }
  }
  
  searchProducts(searchTerm: string): IProduct[] {
    if (!searchTerm.trim()) {
      return this.ProductList;
    }
    return this.ProductList.filter(p => 
      p.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
