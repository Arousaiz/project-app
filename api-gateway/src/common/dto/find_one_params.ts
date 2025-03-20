import { IsInt } from 'class-validator';

export class FindOneParams {
  @IsInt()
  id: number;
}
