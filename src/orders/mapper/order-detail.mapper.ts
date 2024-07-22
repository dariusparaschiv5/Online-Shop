import { OrderDetail } from '../domain/order-detail.domain';
import { CreateOrderDetailDto } from '../dto/create-order-detail.dto';
import { OrderDetailDto } from '../dto/order-detail.dto';
import { Order } from '../domain/order.domain';
import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';

export class OrderDetailMapper {
  toDomain(createOrderDetailDto: CreateOrderDetailDto): OrderDetail {
    const orderDetail = new OrderDetail();

    orderDetail.order = { id: createOrderDetailDto.ordersId } as Order;
    orderDetail.product = { id: createOrderDetailDto.productId } as Product;
    orderDetail.location = { id: createOrderDetailDto.locationId } as Location;
    orderDetail.quantity = createOrderDetailDto.quantity;

    return orderDetail;
  }

  toDto(orderDetail: OrderDetail): OrderDetailDto {
    const orderDetailDto = new OrderDetailDto();
    orderDetailDto.order = orderDetail.order;
    orderDetailDto.product = orderDetail.product;
    orderDetailDto.location = orderDetail.location;
    orderDetailDto.quantity = orderDetail.quantity;
    return orderDetailDto;
  }
}
