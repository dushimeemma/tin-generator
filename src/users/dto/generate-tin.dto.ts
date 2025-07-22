import { IsOptional, IsString, MinLength } from 'class-validator';

export class GenerateTinDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
