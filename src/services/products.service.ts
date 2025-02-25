import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';

@Service()
export class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = await ProductModel.find();
    return products;
  }

  // Find a product by its ID
  public async findProductById(productId: string): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  // Create a new product
  public async createProduct(productData: Product): Promise<Product> {
    const createProductData: Product = await ProductModel.create({ ...productData });

    return createProductData;
  }

  // Update product details
  public async updateProduct(productId: string, productData: Product): Promise<Product> {
    const updateProductById: Product = await ProductModel.findByIdAndUpdate(productId, { $set: productData }, { new: true });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  // Delete a product
  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await ProductModel.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "Product doesn't exist");

    return deleteProductById;
  }
}
