import { OrderDetail } from '../domain/order-detail.domain';
import { CreateOrderDetailDTO } from '../dto/create-order-detail.dto';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { Order } from '../domain/order.domain';
import { Product } from '../../products/domain/product.domain';
import { Location } from '../../products/domain/location.domain';

export class OrderDetailMapper {
  toDomain(createOrderDetailDto: CreateOrderDetailDTO): OrderDetail {
    const orderDetail = new OrderDetail();

    orderDetail.order = { id: createOrderDetailDto.ordersId } as Order;
    orderDetail.product = { id: createOrderDetailDto.productId } as Product;
    orderDetail.location = { id: createOrderDetailDto.locationId } as Location;
    orderDetail.quantity = createOrderDetailDto.quantity;

    return orderDetail;
  }

  toDto(orderDetail: OrderDetail): OrderDetailDTO {
    const orderDetailDto = new OrderDetailDTO();
    orderDetailDto.product = orderDetail.product;
    orderDetailDto.location = orderDetail.location;
    orderDetailDto.quantity = orderDetail.quantity;
    return orderDetailDto;
  }

  toDomains(createOrderDetailDtos: CreateOrderDetailDTO[]) {
    const orderDetails: OrderDetail[] = [];
    createOrderDetailDtos.map((createOrderDetailDto) => {
      orderDetails.push(this.toDomain(createOrderDetailDto));
    });
    return orderDetails;
  }
}
