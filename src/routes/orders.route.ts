import { Router } from 'express';
import { OrderController } from '@controllers/order.controller';
import { OrderDTO } from '@dtos/orders.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class OrderRoute implements Routes {  
  public path = '/orders';
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.order.getAllOrders);  
    this.router.get(`${this.path}/:id`, this.order.getOrderById);  
    this.router.post(`${this.path}`, ValidationMiddleware(OrderDTO), this.order.createOrder);  
    this.router.delete(`${this.path}/:id`, this.order.deleteOrder);  
  }
}