import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Product } from '@interfaces/products.interface';
import { ProductService } from '@services/products.service';

export class ProductController {
  public product = Container.get(ProductService);

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = req.query;
      const findAllProductData: Product[] = await this.product.findAllProduct(filters);
      res.status(200).json({ data: findAllProductData, message: 'Products retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findOneProductData: Product = await this.product.findProductById(productId);
      res.status(200).json({ data: findOneProductData, message: 'Product retrieved successfully' });
    } catch (error) {
      next(error); 
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: Product = req.body;
      const createProductData: Product = await this.product.createProduct(productData);
      res.status(201).json({ data: createProductData, message: 'Product created successfully' });
    } catch (error){
      next(error); 
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: Product = req.body;
      const updateProductData: Product = await this.product.updateProduct(productId, productData);
      res.status(200).json({ data: updateProductData, message: 'Product updated successfully' });
    } catch (error) {
      next(error); 
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: Product = await this.product.deleteProduct(productId);
      res.status(200).json({ data: deleteProductData, message: 'Product deleted successfully' });
    } catch (error) {
      next(error); 
    }
  };
}
