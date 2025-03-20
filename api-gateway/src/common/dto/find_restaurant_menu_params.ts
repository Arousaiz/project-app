import { IsInt } from 'class-validator';

export class FindRestaurantMenuParams {
  @IsInt()
  id: number;

  @IsInt()
  menuId: number;
}
