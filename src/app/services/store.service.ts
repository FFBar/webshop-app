import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../components/models/product.model';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'asc',
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?limit=${limit}&sort=${sort}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${STORE_BASE_URL}/products/categories`);
  }
}
