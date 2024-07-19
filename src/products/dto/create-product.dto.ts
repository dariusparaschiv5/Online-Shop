export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly weight: number;
  readonly categoryId: string;
  readonly supplier: string;
  readonly imageUrl: string;
}
