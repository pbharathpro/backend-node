import { IsString, IsNumber, IsNotEmpty, Min, Max, IsOptional,Matches } from 'class-validator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9 ]+$/, { message: 'productName must be in lowercase can include numbers' })
  productName: string;

  @IsNumber()
  @Min(0)
  price: number;
  
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z ]+$/, { message: 'category must be in lowercase' })
  category: string;

  @IsNumber()
  @Min(1)
  @Max(100000)
  quantity: number;

}
