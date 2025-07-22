import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(10, 10)
  tin: string;

  @IsNotEmpty()
  newPassword: string;
}
