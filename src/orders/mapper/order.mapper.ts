import { CustomerDTO } from 'src/customers/dto/customer.dto';
import { Order } from '../domain/order.domain';
import { OrderDTO } from '../dto/order.dto';
import { Customer } from 'src/customers/domain/customer.domain';
import { CreateOrderDTO } from '../dto/create-order.dto';

export class OrderMapper {
  static toDTO(order: Order, customerDTO: CustomerDTO): OrderDTO {
    return new OrderDTO(
      customerDTO,
      order.createdAt,
      order.country,
      order.city,
      order.county,
      order.streetAdress,
    );
  }

  static toEntity(orderDTO: OrderDTO, customer: Customer): Order {
    return new Order(
      customer,
      orderDTO.country,
      orderDTO.city,
      orderDTO.county,
      orderDTO.streetAdress,
      orderDTO.createdAt,
    );
  }

  static toCreateDTO(order: Order): CreateOrderDTO {
    return new CreateOrderDTO(
      order.customer.id,
      order.country,
      order.city,
      order.county,
      order.streetAdress,
      order.createdAt,
    );
  }

  static createDTOToEntity(
    createOrderDTO: CreateOrderDTO,
    customer: Customer,
  ): Order {
    return new Order(
      customer,
      createOrderDTO.country,
      createOrderDTO.city,
      createOrderDTO.county,
      createOrderDTO.streetAdress,
    );
  }
}
