import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';
import { ProductFilters } from '@/interfaces/productFilters.interface';


@Service()
export class ProductService {
  public async findAllProduct(filters: ProductFilters): Promise<Product[]> {
    const query: any = {};

    // filters if provided
    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice) {
      query.price = query.price || {};
      query.price.$gte = parseFloat(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price = query.price || {};
      query.price.$lte = parseFloat(filters.maxPrice);
    }

    if (filters.isActive === "true" || filters.isActive === "false") {
      query.isActive = filters.isActive === "true";
    }

    if (filters.searchTerm) {
      query.productName = { $regex: filters.searchTerm, $options: "i" }; // Case-insensitive search
    }

    // Sorting logic
    const sort: any = {};
    
    if (filters.sortBy) {
      const sortDirection = filters.order === "desc" ? -1 : 1;
      sort[filters.sortBy] = sortDirection;
    } else {
      sort["price"] = 1; 
    }

    return await ProductModel.find(query).sort(sort);
  }


  // Find a product by its ID
  public async findProductById(productId: string): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  // Create a new product
  public async createProduct(productData: Product): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ productName: productData.productName});
    if (findProduct) throw new HttpException(409, "Product Already exist");
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
