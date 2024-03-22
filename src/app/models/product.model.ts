export class ProductModel{
  id!: number;
  title!: string;
  description!: string;
  price!: number;
  discountPercentage!: number;
  rating!: number;
  stock!: number;
  brand!: string;
  category!: string;
  thumbnail!: string; // Replace "..." with the actual type for thumbnail, e.g., string
  images!: string[];
}
