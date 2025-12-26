import { inject, Injectable, signal } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Product } from '../models/proudct.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceTs {
  private http = inject(HttpClient)
  private apiUrl= environment.apiUrl
 
products = signal<Product[]>([])
loading = signal<boolean>(false)


async getAllProducts(){
  this.loading.set(true)
  this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
    next: (data) => this.products.set(data),
    error:(err)=>console.error(err),
    complete:()=> this.loading.set(false)
  })
}


}
