import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../components/models/product.model';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(limit = '10', sort = 'desc'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    );
  }
  getAllCategoris(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
