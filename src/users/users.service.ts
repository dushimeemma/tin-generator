import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async generateUniqueTin(): Promise<string> {
    let tin: string;
    let exists: User | undefined;

    do {
      tin = this.generateTin();
      exists = (await this.userRepository.findOne({ where: { tin } })) as User;
    } while (exists);

    return tin;
  }

  private generateTin(): string {
    return Math.floor(1_000_000_000 + Math.random() * 9_000_000_000).toString();
  }

  async generateTinAndPassword(
    password?: string,
  ): Promise<{ tin: string; password: string }> {
    const tin = await this.generateUniqueTin();

    const rawPassword = password || Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = this.userRepository.create({ tin, password: hashedPassword });
    try {
      const newUser = await this.userRepository.save(user);
      return { tin: newUser.tin, password: rawPassword };
    } catch (error) {
      console.log({ error });

      if (error.code === '23505') {
        throw new ConflictException('TIN already exists.');
      }
      throw error;
    }
  }

  async updatePassword(tin: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { tin } });
    if (!user) throw new NotFoundException('User with this TIN not found.');

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }
}
