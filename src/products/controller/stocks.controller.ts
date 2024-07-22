import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StocksService } from '../service/stocks.service';
import { StockMapper } from '../mapper/stock.mapper';
import { CreateStockDTO } from '../dto/create-stock.dto';
import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
    private readonly stockMapper: StockMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The stock has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createStockDto: CreateStockDTO): Promise<Stock> {
    const stock = this.stockMapper.toDomain(createStockDto);
    return this.stocksService.create(stock);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All stocks retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<StockDTO[]> {
    const stocks = await this.stocksService.findAll();
    return stocks.map((stock) => this.stockMapper.toDTO(stock));
  }

  @Get(':locationId/:productId')
  @ApiResponse({ status: 200, description: 'Stock retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
  ): Promise<StockDTO | null> {
    const stock = await this.stocksService.findOne(locationId, productId);
    return this.stockMapper.toDTO(stock);
  }

  @Put(':locationId/:productId')
  @ApiResponse({ status: 200, description: 'Stock updated successfully.' })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateStock(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
    @Body() newStock: CreateStockDTO,
  ): Promise<Stock> {
    const stock = this.stockMapper.toDomain(newStock);
    return this.stocksService.update(locationId, productId, stock);
  }
}
