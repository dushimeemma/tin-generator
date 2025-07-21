import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GenerateTinDto } from './dto/generate-tin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AccessKeyGuard } from 'src/common/guards/access-key.guard';

@UseGuards(AccessKeyGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('generate')
  async generateTin(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    generateTinDto: GenerateTinDto,
  ) {
    const { tin, password } = await this.usersService.generateTinAndPassword(
      generateTinDto?.password,
    );
    return { tin, password };
  }

  @Patch('update-password')
  async updatePassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(
      updatePasswordDto.tin,
      updatePasswordDto.newPassword,
    );
    return { message: 'Password updated successfully.' };
  }
}
