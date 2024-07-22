import { Stock } from '../domain/stock.domain';
import { CreateStockDto } from '../dto/create-stock.dto';
import { StockDTO } from '../dto/stock.dto';

export class StockMapper {
  toDomain(createStockDto: CreateStockDto): Stock {
    const stock = new Stock();
    stock.locationId = createStockDto.locationId;
    stock.productId = createStockDto.productId;
    stock.quantity = createStockDto.quantity;

    return stock;
  }

  toDTO(stock: Stock): StockDTO {
    const stockDto = new StockDTO();
    stockDto.quantity = stock.quantity;
    stockDto.location = stock.location;
    stockDto.product = stock.product;
    return stockDto;
  }
}
