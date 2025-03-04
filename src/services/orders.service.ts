import { Service } from 'typedi'; 
import { HttpException } from '@exceptions/httpException';
import { Order } from '@interfaces/orders.interface';
import { OrderModel } from '@models/orders.model';
import { ProductModel } from '@models/products.model';

@Service()
export class OrderService {
  // Find all orders
  public async findAllOrders(): Promise<Order[]> {
    const orders: Order[] = await OrderModel.find();
    return orders;
  }

  // Find an order by its ID
  public async findOrderById(orderId: string): Promise<Order> {
    const findOrder: Order = await OrderModel.findOne({ _id: orderId });
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    return findOrder;
  }
  
  // Create order
  public async createOrder(orderData: Order): Promise<Order> {
    const product = await ProductModel.findById(orderData.productId);
    console.log(product);
    if (!product) throw new HttpException(404, "Product not found");
  
    if (product.quantity < 0) throw new HttpException(400, "Product is out of stock");
    if (product.quantity < orderData.quantity) throw new HttpException(400, "Not enough stock available");
  
    const totalPrice = product.price * orderData.quantity;

    // Reduce quantity & update isActive status in one query
    await ProductModel.findByIdAndUpdate(orderData.productId, {
      $inc: { quantity: -orderData.quantity },
      $set: { isActive: product.quantity - orderData.quantity > 0 }
    });

    const createOrderData: Order = await OrderModel.create({ 
      ...orderData, 
      totalPrice  
    });
    return createOrderData;
  }

  // Delete an order
  public async deleteOrder(orderId: string): Promise<Order> {
    const deleteOrderById: Order = await OrderModel.findByIdAndDelete(orderId);
    if (!deleteOrderById) throw new HttpException(409, "Order doesn't exist");

    return deleteOrderById;
  }
}
