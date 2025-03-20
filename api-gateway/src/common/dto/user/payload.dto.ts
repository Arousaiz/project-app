import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class payloadDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
