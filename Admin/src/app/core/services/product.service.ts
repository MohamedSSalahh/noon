import { inject, Injectable, signal } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Product } from '../models/proudct.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceTs {
  private http = inject(HttpClient)
  private apiUrl= environment.apiUrl;
 
products = signal<Product[]>([])
loading = signal<boolean>(false)



  async getAllProducts() {
    this.loading.set(true);
    this.http.get<any>(`${this.apiUrl}/api/v1/products`).subscribe({
      next: (res) => {
        // Handle wrapped responses (e.g. { data: [...] } or { products: [...] })
        let data = Array.isArray(res) ? res : (res.data || res.products || []);
        
        // Fix Image URLs
        data = data.map((product: Product) => ({
          ...product,
          imageCover: product.imageCover && !product.imageCover.startsWith('http') 
            ? `${this.apiUrl}/products/${product.imageCover}` 
            : product.imageCover
        }));

        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.products.set([]); // Reset to empty on error to avoid template errors
      },
      complete: () => this.loading.set(false),
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/api/v1/products/${id}`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}/api/v1/products`, data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/v1/products/${id}`, data);
  }

  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/api/v1/products/${id}`);
  }
}
