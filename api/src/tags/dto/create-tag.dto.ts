import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @MaxLength(15)
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(5, { message: 'You can select at most 5 posts at a time' }) // forc checking array length
  @IsUUID(4, { each: true }) // each item must be a UUID version 4 format
  postIds?: string[];
}
