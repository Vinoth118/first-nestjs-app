import { Body, Controller, Post, Get, Param, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  addProduct(@Body() reqBody: { title: string, price: { price: number, compareAtPrice: number } }) {
    if(reqBody && reqBody.title && typeof reqBody.title === 'string' && reqBody.price && typeof reqBody.price === 'object') {
      const createdProductId = this.productService.addProduct(reqBody.title, reqBody.price);
      return { success: true, message: "PRODUCT_CREATED_SUCCESSFULLY", product: { id: createdProductId, title: reqBody.title, price: reqBody.price } }
    } else if (reqBody && !reqBody.price && !reqBody.title) {
      return { success: false, error: "Missing Params", params: ["title", "price"] }
    } else if (reqBody && reqBody.price && reqBody.title && typeof reqBody.title !== 'string' && typeof reqBody.price !== 'object') {
      return { success: false, error: "Invalid Params", params: ["title", "price"] }
    } else if(reqBody && !reqBody.title) {
      return { success: false, error: "Missing Param", param: "title" }
    } else if(reqBody && reqBody.title && typeof reqBody.title !== 'string') {
      return { success: false, error: "Invalid Param", param: "title" }
    } else if(reqBody && !reqBody.price) {
      return { success: false, error: "Missing Param", param: "price" }
    } else if(reqBody && reqBody.price && typeof reqBody.price !== 'object') {
      return { success: false, error: "Invalid Param", param: "price" }
    }
  }

  @Get()
  getAllProduct() {
    const productList = this.productService.getAllProducts();
    return { success: true, products: productList }
  }

  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    const product = this.productService.getSingleProduct(id);
    return { success: true, product: product }
  }

  @Patch(':id')
  updateSingleProduct(@Param('id') id: string, @Body('title') title: string, @Body('price') price: { price: number, compareAtPrice: number } ) {
    if(title && typeof title == 'string' && price && typeof price == 'object') {
      if(price.hasOwnProperty('price') == false || price.hasOwnProperty('compareAtPrice') == false) {
        return { success: false, error: "Invalid Param", param: "price" }
      } else {
        this.productService.updateSingleProduct(id, title, price);
        return { success: true, message: "PRODUCT_UPDATED_SUCCESSFULLY" }
      }
    } else if(title && typeof price == 'undefined') {
      if(typeof title != 'string') {
        return { success: false, error: "Invalid Param", param: "title" }
      } else {
        this.productService.updateSingleProduct(id, title);
        return { success: true, message: "PRODUCT_UPDATED_SUCCESSFULLY" }
      }
    } else if(price && typeof price == 'object' && typeof title == 'undefined') {
      if(price.hasOwnProperty('price') && price.hasOwnProperty('compareAtPrice')) {
        return { success: false, error: "Invalid Param", param: "price" }
      } else {
        this.productService.updateSingleProduct(id, undefined, price);
        return { success: true, message: "PRODUCT_UPDATED_SUCCESSFULLY" }
      }
    } else if(typeof title == 'undefined' && typeof price == 'undefined') {
      return { success: false, error: "Missing Param", param: ["title", "price"] }
    } else if(typeof title != 'undefined' && typeof price != 'undefined') {
      if(typeof title != 'string' && typeof price != 'object') { 
        return { success: false, error: "Invalid Param", param: ["title", "price"] }
      } else if(typeof title != 'string') {
        return { success: false, error: "Invalid Param", param: "title" }
      } else if(typeof price != 'object') {
        return { success: false, error: "Invalid Param", param: "price" }
      }
    } else if(typeof title == 'undefined' && typeof price != 'undefined') {
      return { success: false, error: "Missing Param", param: "title" }
    } else if(typeof title != 'undefined' && typeof price == 'undefined') {
      return { success: false, error: "Missing Param", param: "price" }
    }
  }

  @Delete(':id')
  deleteSingleProduct(@Param('id') id: string) {
    const product = this.productService.deleteSingleProduct(id);
    return { success: true, message: "PRODUCT_DELETED_SUCCESSFULLY" }
  }

}
