import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StocksService } from '../service/stocks.service';
import { StockMapper } from '../mapper/stock.mapper';
import { CreateStockDto } from '../dto/create-stock.dto';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
    private stockMapper: StockMapper,
  ) {}

  @Post()
  async create(@Body() createStockDto: CreateStockDto): Promise<Stock> {
    const stock = this.stockMapper.toDomain(createStockDto);
    return this.stocksService.create(stock);
  }

  @Get()
  async findAll(): Promise<StockDTO[]> {
    const stocks = await this.stocksService.findAll();
    return stocks.map((stock) => this.stockMapper.toDTO(stock));
  }

  @Get(':locationId/:productId')
  async findOne(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
  ): Promise<StockDTO | null> {
    const stock = await this.stocksService.findOne(locationId, productId);
    return this.stockMapper.toDTO(stock);
  }

  @Put(':locationId/:productId')
  async updateStock(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
    @Body() newStock: CreateStockDto,
  ): Promise<Stock> {
    const stock = this.stockMapper.toDomain(newStock);
    return this.stocksService.update(locationId, productId, stock);
  }
}
