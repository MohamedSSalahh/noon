import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = signal([
    {
      id: 1,
      title: 'Basic Tee',
      price: '35',
      category: 'Men',
      image: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
    },
    {
      id: 2,
      title: 'Artwork Tee',
      price: '35',
      category: 'Men',
      image: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg'
    },
    {
      id: 3,
      title: 'Basic Tee',
      price: '35',
      category: 'Women',
      image: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg'
    },
     {
      id: 4,
      title: 'Artwork Tee',
      price: '35',
      category: 'Women',
      image: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg'
    }
  ]);
}
