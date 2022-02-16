import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  productList: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.productList.findIndex(product => product.id === id);
    const product = this.productList[productIndex];
    if(!product) {
      throw new NotFoundException('Could not find product!.')
    }
    return [product, productIndex];
  }

  addProduct(title: string, price: { price: number, compareAtPrice: number }) {
    const createdProductId = Math.random().toString();
    const newProduct = new Product(createdProductId, title, price);
    this.productList.push(newProduct);
    return createdProductId;
  }

  getAllProducts(): Product[] {
    return this.productList;
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id)[0];
    return product;
  }

  updateSingleProduct(id: string, title?: string, price?: { price: number, compareAtPrice: number }) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if(title) {
      updatedProduct.title = title;
    }
    if(price) {
      updatedProduct.price = price;
    }
    this.productList[index] = updatedProduct;
    return null;
  }

  deleteSingleProduct(id: string) {
    const productIndex = this.findProduct(id)[1];
    this.productList.splice(productIndex, 1);
    return null;
  }
  
}
