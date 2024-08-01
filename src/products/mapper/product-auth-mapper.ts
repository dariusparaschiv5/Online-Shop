import { ProductCategory } from '../domain/product-category.domain';
import { Product } from '../domain/product.domain';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductAuthDTO } from '../dto/product-auth.dto';
import { ProductDTO } from '../dto/product.dto';

export class ProductAuthMapper {
  // toDomain(createProductDTO: CreateProductDTO): Product {
  //   const product = new Product();
  //   product.name = createProductDTO.name;
  //   product.description = createProductDTO.description;
  //   product.price = createProductDTO.price;
  //   product.weight = createProductDTO.weight;
  //   product.category = {
  //     id: createProductDTO.categoryId,
  //   } as unknown as ProductCategory;
  //   product.supplier = createProductDTO.supplier;
  //   product.imageUrl = createProductDTO.imageUrl;
  //   return product;
  // }

  toDTO(product: Product): ProductAuthDTO {
    if (!product.category) {
      throw new Error(`Category not found for product ID ${product.id}`);
    }
    const productAuthDTO = new ProductAuthDTO();
    productAuthDTO.id = product.id;
    productAuthDTO.name = product.name;
    productAuthDTO.description = product.description;
    productAuthDTO.price = product.price;
    productAuthDTO.weight = product.weight;
    productAuthDTO.category = product.category
      ? {
          name: product.category.name,
          description: product.category.description,
        }
      : {
          name: 'Default category',
          description: 'Default category description',
        };
    productAuthDTO.supplier = product.supplier;
    productAuthDTO.imageUrl = product.imageUrl;
    return productAuthDTO;
  }
}
