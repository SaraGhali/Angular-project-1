import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor() {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  searchProducts(params: { title?: string; price_min?: number; price_max?: number; categoryId?: number }): Observable<IProduct[]> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<IProduct[]>(this.apiUrl, { params: httpParams });
  }

  // Placeholder for methods that used to mutate static data
  buy(product: IProduct): void {
    if (product.quantity && product.quantity > 0) {
      product.quantity--;
    }
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}

