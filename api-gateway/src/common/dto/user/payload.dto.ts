import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class payloadDto {
  @IsNumber()
  userId: number;
  @IsString()
  username: string;
}
