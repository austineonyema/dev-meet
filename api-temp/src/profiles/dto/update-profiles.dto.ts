import { IsString, Length, MinLength } from 'class-validator';

IsString;
export class UpdateProfileDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;
}
