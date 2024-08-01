import { OrderDetail } from '../domain/order-detail.domain';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { Location } from '../../products/domain/location.domain';
import { CreateOrderDetailDTO } from '../dto/create-order-detail.dto';
import { OrderDTO } from '../dto/order.dto';
import { ProductDTO } from 'src/products/dto/product.dto';
import { LocationDTO } from 'src/products/dto/location.dto';

export class OrderDetailMapper {
  static toDTO(
    orderDetail: OrderDetail,
    orderDTO: OrderDTO,
    productDTO: ProductDTO,
    locationDTO: LocationDTO,
  ): OrderDetailDTO {
    return new OrderDetailDTO(
      orderDTO,
      productDTO,
      locationDTO,
      orderDetail.quantity,
    );
  }

  static createDTOToEntity(
    createOrderDetailDTO: CreateOrderDetailDTO,
    shippedFrom: Location,
  ): OrderDetail {
    return new OrderDetail(
      createOrderDetailDTO.ordersId,
      createOrderDetailDTO.productId,
      shippedFrom,
      createOrderDetailDTO.quantity,
    );
  }

  // toDomain(createOrderDetailDto: CreateOrderDetailDTO): OrderDetail {
  //   const orderDetail = new OrderDetail();
  //   orderDetail.product = { id: createOrderDetailDto.productId } as Product;
  //   orderDetail.location = { id: createOrderDetailDto.locationId } as Location;
  //   orderDetail.quantity = createOrderDetailDto.quantity;
  //   return orderDetail;
  // }
  // toDto(orderDetail: OrderDetail): OrderDetailDTO {
  //   const orderDetailDto = new OrderDetailDTO();
  //   orderDetailDto.product = orderDetail.product;
  //   orderDetailDto.location = orderDetail.location;
  //   orderDetailDto.quantity = orderDetail.quantity;
  //   return orderDetailDto;
  // }
  // toDomains(createOrderDetailDtos: CreateOrderDetailDTO[] | undefined | null) {
  //   if (!createOrderDetailDtos) {
  //     // If no order details DTOs are provided, log an error or return an empty array
  //     console.error('No order detail DTOs provided to map to domain models.');
  //     return []; // Return an empty array to prevent further errors
  //   }
  //   const orderDetails: OrderDetail[] = createOrderDetailDtos.map(
  //     (createOrderDetailDto) => {
  //       return this.toDomain(createOrderDetailDto);
  //     },
  //   );
  //   return orderDetails;
  // }
}
