import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class payloadDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
