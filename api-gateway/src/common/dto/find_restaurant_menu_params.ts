import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindRestaurantMenuParams {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  menuId: string;
}
