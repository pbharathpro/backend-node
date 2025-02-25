import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Order } from '@interfaces/orders.interface';
import { OrderService } from '@services/orders.service';

export class OrderController {
  public order = Container.get(OrderService);

  // Get all orders
  public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrderData: Order[] = await this.order.findAllOrders();
      res.status(200).json({ data: findAllOrderData, message: 'Orders retrieved successfully' });
    } catch (error) {
      next(error); 
    }
  };

  // Get order by ID
  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const findOneOrderData: Order = await this.order.findOrderById(orderId);

      res.status(200).json({ data: findOneOrderData, message: 'Order retrieved successfully' });
    } catch (error) {
      next(error); 
    }
  };

  // Create a new order
  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData: Order = req.body;
      const createOrderData: Order = await this.order.createOrder(orderData);

      res.status(201).json({ data: createOrderData, message: 'Order created successfully' });
    } catch (error) {
      next(error); 
    }
  };

  // Delete an order
  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const deleteOrderData: Order = await this.order.deleteOrder(orderId);

      res.status(200).json({ data: deleteOrderData, message: 'Order deleted successfully' });
    } catch (error) {
      next(error); 
    }
  };
}
