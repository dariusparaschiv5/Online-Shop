import { ProductCategory } from '../domain/product-category.domain';
import { Product } from '../domain/product.domain';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductAuthDTO } from '../dto/product-auth.dto';
import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductDTO } from '../dto/product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

export class ProductMapper {
  static updateDTOToEntity(
    updateProductDTO: CreateProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      updateProductDTO.name,
      updateProductDTO.description,
      updateProductDTO.price,
      updateProductDTO.weight,
      updateProductDTO.supplier,
      updateProductDTO.imageUrl,
      productCategory,
    );
  }
  static toDTO(
    product: Product,
    productCategoryDTO: ProductCategoryDTO,
  ): ProductDTO {
    return new ProductDTO(
      product.name,
      product.description,
      product.price,
      product.weight,
      product.supplier,
      product.imageUrl,
      productCategoryDTO,
    );
  }

  static toEntity(
    productDTO: ProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      productDTO.name,
      productDTO.description,
      productDTO.price,
      productDTO.weight,
      productDTO.supplier,
      productDTO.imageUrl,
      productCategory,
    );
  }

  static toCreateDTO(product: Product): CreateProductDTO {
    return new CreateProductDTO(
      product.name,
      product.description,
      product.price,
      product.weight,
      product.supplier,
      product.imageUrl,
      product.category.id,
    );
  }

  static createDTOToEntity(
    createProductDTO: CreateProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      createProductDTO.name,
      createProductDTO.description,
      createProductDTO.price,
      createProductDTO.weight,
      createProductDTO.supplier,
      createProductDTO.imageUrl,
      productCategory,
    );
  }
}
