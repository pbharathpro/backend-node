import { Router } from 'express';
import { ProductController } from '@controllers/product.controller';
import { ProductDTO } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ProductRoute implements Routes {  
  public path = '/products';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product.getAllProducts);  
    this.router.get(`${this.path}/:id`, this.product.getProductById);  
    this.router.post(`${this.path}`, ValidationMiddleware(ProductDTO), this.product.createProduct);  
    this.router.put(`${this.path}/:id`, ValidationMiddleware(ProductDTO, true), this.product.updateProduct);  
    this.router.delete(`${this.path}/:id`, this.product.deleteProduct);  
  }
}
