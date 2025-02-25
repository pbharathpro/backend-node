import { IsString, IsNumber, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(1)
  @Max(10000)
  quantity: number;

}
