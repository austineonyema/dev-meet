import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @MaxLength(15)
  @IsString()
  name: string;
}
