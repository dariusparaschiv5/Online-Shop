import { Stock } from '../domain/stock.domain';
import { CreateStockDTO } from '../dto/create-stock.dto';
import { StockDTO } from '../dto/stock.dto';

export class StockMapper {
  toDomain(createStockDto: CreateStockDTO): Stock {
    const stock = new Stock();
    stock.locationId = createStockDto.locationId;
    stock.productsId = createStockDto.productsId;
    stock.quantity = createStockDto.quantity;

    return stock;
  }

  toDTO(stock: Stock): StockDTO {
    const stockDto = new StockDTO();
    stockDto.quantity = stock.quantity;
    stockDto.location = stock.location;
    stockDto.product = stock.products;
    return stockDto;
  }
}
