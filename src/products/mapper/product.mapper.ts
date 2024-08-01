import { ProductCategory } from '../domain/product-category.domain';
import { Product } from '../domain/product.domain';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductDTO } from '../dto/product.dto';

export class ProductMapper {
  toDomain(createProductDTO: CreateProductDTO): Product {
    const product = new Product();
    product.name = createProductDTO.name;
    product.description = createProductDTO.description;
    product.price = createProductDTO.price;
    product.weight = createProductDTO.weight;
    product.category = {
      id: createProductDTO.categoryId,
    } as unknown as ProductCategory;
    product.supplier = createProductDTO.supplier;
    product.imageUrl = createProductDTO.imageUrl;
    return product;
  }

  toDTO(product: Product): ProductDTO {
    if (!product.category) {
      throw new Error(`Category not found for product ID ${product.id}`);
    }
    const productDTO = new ProductDTO();
    productDTO.name = product.name;
    productDTO.description = product.description;
    productDTO.price = product.price;
    productDTO.weight = product.weight;
    productDTO.category = product.category
      ? {
          name: product.category.name,
          description: product.category.description,
        }
      : {
          name: 'Default category',
          description: 'Default category description',
        };
    productDTO.supplier = product.supplier;
    productDTO.imageUrl = product.imageUrl;
    return productDTO;
  }
}
