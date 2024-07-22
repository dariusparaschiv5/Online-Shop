import { OrderDetail } from '../domain/order-detail.domain';
import { CreateOrderDetailDTO } from '../dto/create-order-detail.dto';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { Order } from '../domain/order.domain';
import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';

export class OrderDetailMapper {
  toDomain(createOrderDetailDto: CreateOrderDetailDTO): OrderDetail {
    const orderDetail = new OrderDetail();

    orderDetail.order = { id: createOrderDetailDto.ordersId } as Order;
    orderDetail.products = createOrderDetailDto.productsId.map(
      (id) =>
        ({
          id: id,
        }) as Product,
    );
    orderDetail.location = { id: createOrderDetailDto.locationId } as Location;
    orderDetail.quantity = createOrderDetailDto.quantity;

    return orderDetail;
  }

  toDto(orderDetail: OrderDetail): OrderDetailDTO {
    const orderDetailDto = new OrderDetailDTO();
    orderDetailDto.order = orderDetail.order;
    orderDetailDto.products = orderDetail.products;
    orderDetailDto.location = orderDetail.location;
    orderDetailDto.quantity = orderDetail.quantity;
    return orderDetailDto;
  }
}
