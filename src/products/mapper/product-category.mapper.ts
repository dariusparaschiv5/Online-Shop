import { Injectable } from '@nestjs/common';
import { ProductCategory } from '../domain/productCategory.domain';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { ProductCategoryDTO } from '../dto/product-category.dto';

@Injectable()
export class ProductCategoryMapper {
  toDomain(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): ProductCategory {
    const productCategory = new ProductCategory();
    productCategory.name = createProductCategoryDTO.name;
    productCategory.description = createProductCategoryDTO.description;
    return productCategory;
  }

  toDTO(productCategory: ProductCategory): ProductCategoryDTO {
    const productCategoryDTO = new ProductCategoryDTO();
    productCategoryDTO.name = productCategory.name;
    productCategoryDTO.description = productCategory.description;
    return productCategoryDTO;
  }
}
