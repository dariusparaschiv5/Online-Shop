import { Customer } from 'src/customers/domain/customer.domain';
import { Order } from '../domain/order.domain';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderDTO } from '../dto/order.dto';
import { OrderDetail } from '../domain/order-detail.domain';
// import { OrderDetail } from '../domain/order-detail.domain';

export class OrderMapper {
  toDomain(createOrderDTO: CreateOrderDTO, orderDetails: OrderDetail[]): Order {
    const order = new Order();
    order.customer = { id: createOrderDTO.customerId } as unknown as Customer;
    order.createdAt = createOrderDTO.createdAt;
    order.city = createOrderDTO.city;
    order.country = createOrderDTO.country;
    order.county = createOrderDTO.county;
    order.streetAdress = createOrderDTO.streetAdress;
    order.orderDetails = orderDetails;
    return order;
  }

  toDTO(order: Order): OrderDTO {
    const orderDTO = new OrderDTO();
    orderDTO.customer = order.customer;
    orderDTO.createdAt = order.createdAt;
    orderDTO.city = order.city;
    orderDTO.country = order.country;
    orderDTO.county = order.county;
    orderDTO.streetAdress = order.streetAdress;
    // orderDTO.orderDetail = order.orderDetail;
    return orderDTO;
  }
}
